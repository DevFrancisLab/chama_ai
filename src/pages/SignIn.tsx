import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9; // naive check
}

export default function SignIn() {
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [capsOn, setCapsOn] = React.useState(false);
  const navigate = useNavigate();

  const isEmail = identifier.includes("@");
  const identifierValid = isEmail ? validateEmail(identifier) : validatePhone(identifier);
  const formValid = identifierValid && password.length > 0;

  function onPasswordKey(e: React.KeyboardEvent<HTMLInputElement>) {
    try {
      // getModifierState exists on KeyboardEvent, but TypeScript's lib may
      // not expose it exactly on React's synthetic event typing; use a
      // type-guard to call it safely.
      const native = (e as unknown) as KeyboardEvent;
      const caps = typeof native.getModifierState === "function" ? native.getModifierState("CapsLock") : false;
      setCapsOn(Boolean(caps));
    } catch (err) {
      setCapsOn(false);
    }
  }

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!formValid) {
      setError("Please provide valid credentials");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // demo success
      toast({ title: "Signed in", description: "Welcome back!" });
      navigate("/dashboard");
    }, 900);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <img src="/chama_ai_logo.png" alt="Chama AI" className="mx-auto w-16 h-16" />
            <CardTitle className="mt-2">Sign in to Chama AI</CardTitle>
            <p className="text-sm text-muted-foreground">Smart. Simple. Secure.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm mb-1 block">Phone or Email</label>
                <Input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Enter phone or email" />
                {!identifierValid && identifier.length > 0 && (
                  <p className="text-xs text-destructive mt-1">Enter a valid phone or email</p>
                )}
              </div>

              <div>
                <label className="text-sm mb-1 block">Password</label>
                <div className="relative">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    onKeyDown={onPasswordKey}
                    placeholder="Enter your password"
                  />
                  <button type="button" className="absolute right-2 top-2 text-sm" onClick={() => setShowPassword((s) => !s)}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {capsOn && <p className="text-xs text-muted-foreground mt-1">Caps Lock is on</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
                  <span className="text-sm">Remember me</span>
                </div>
                <a className="text-sm text-primary" href="#">Forgot password?</a>
              </div>

              {error && <div className="text-sm text-destructive">{error}</div>}

              <div className="flex flex-col gap-2">
                <Button disabled={!formValid || loading} type="submit">
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <div className="text-xs text-muted-foreground">Or continue with</div>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Google</Button>
                  <Button variant="outline" className="flex-1">Apple</Button>
                </div>
                <div className="text-center text-sm">
                  Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
