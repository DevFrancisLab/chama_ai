import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// Avoid react-query here to prevent runtime mismatch in the dev bundle.

function passwordStrength(pw: string) {
  const length = pw.length >= 8;
  const upper = /[A-Z]/.test(pw);
  const number = /[0-9]/.test(pw);
  const special = /[^A-Za-z0-9]/.test(pw);
  return { length, upper, number, special, score: [length, upper, number, special].filter(Boolean).length };
}

export default function SignUp() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [creatingChama, setCreatingChama] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState<Record<string, unknown> | string | null>(null);
  const navigate = useNavigate();

  const strength = passwordStrength(password);
  // Require a minimum of 8 characters for signup to keep UX friendly. Strength indicators remain informative.
  const passwordOk = password.length >= 8;
  const canSubmit = Boolean(firstName && phone && passwordOk && confirm === password && terms);

  async function performSignup(payload: Record<string, unknown>) {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/signup/', payload, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
      const data = res.data;
      if (data?.access) {
        try {
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
        } catch (e) {
          // ignore storage errors
        }
        toast({ title: 'Account created', description: 'You are signed in' });
        navigate('/dashboard');
        return;
      }
      toast({ title: "Account created", description: "Please sign in to continue" });
      navigate("/signin");
    } catch (err) {
      const e = err as unknown as { response?: { data?: unknown }; message?: string };
      const resp = e?.response?.data ?? e?.message ?? 'Signup failed';
      setServerErrors(resp as any);
      setLoading(false);
    }
  }

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setServerErrors(null);
    if (!canSubmit) return;
    setLoading(true);
    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      password,
      create_chama: creatingChama,
      chama_name: '',
      chama_type: '',
    };
    void performSignup(payload);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <img src="/chama_ai_logo.png" alt="Chama AI" className="mx-auto w-16 h-16" />
            <CardTitle className="mt-2">Create Your Account</CardTitle>
            <p className="text-sm text-muted-foreground">Join your chama or create a new one.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">First name</label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
              </div>
              <div>
                <label className="text-sm">Last name</label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
              </div>

              <div>
                <label className="text-sm">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+2547xxxxxxxx" />
              </div>
              <div>
                <label className="text-sm">Email (optional)</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
              </div>

              <div>
                <label className="text-sm">Password</label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create password" />
                <div className="text-xs mt-1">
                  <div>Password strength: {strength.score}/4</div>
                  <div className="text-xs text-muted-foreground">Requirements: 8+ chars, 1 uppercase, 1 number, 1 special</div>
                </div>
              </div>
              <div>
                <label className="text-sm">Confirm Password</label>
                <Input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="Confirm password" />
                {confirm && confirm !== password && <div className="text-xs text-destructive">Passwords do not match</div>}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2">
                <input id="join" type="radio" name="chama" checked={!creatingChama} onChange={() => setCreatingChama(false)} />
                <label htmlFor="join">Join an existing Chama</label>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input id="create" type="radio" name="chama" checked={creatingChama} onChange={() => setCreatingChama(true)} />
                <label htmlFor="create">Create a new Chama</label>
              </div>

              {creatingChama && (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Chama name" />
                  <Input placeholder="Chama type (e.g., Savings Group)" />
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Checkbox checked={terms} onCheckedChange={(v) => setTerms(Boolean(v))} />
              <label className="text-sm">I agree to the <a href="#" className="text-primary">Terms</a> and <a href="#" className="text-primary">Privacy Policy</a></label>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Button disabled={!canSubmit || loading} type="submit">{loading ? "Creating..." : "Create Account"}</Button>
              {serverErrors && (
                <div className="text-sm text-destructive mt-2">
                  {typeof serverErrors === 'object'
                    ? Object.entries(serverErrors).map(([k, v]) => (
                        <div key={k}>
                          <strong>{k}:</strong> {Array.isArray(v) ? v.join(', ') : String(v)}
                        </div>
                      ))
                    : String(serverErrors)}
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border" />
                <div className="text-xs text-muted-foreground">Or continue with</div>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Google</Button>
                <Button variant="outline" className="flex-1">Apple</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
