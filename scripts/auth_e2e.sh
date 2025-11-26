#!/usr/bin/env bash
set -euo pipefail

FRONTEND_URL=${FRONTEND_URL:-http://localhost:5174}
TEST_EMAIL="test+$(date +%s)@example.com"
TEST_PHONE="+2547$(printf "%08d" $((RANDOM%100000000)))"
PASSWORD="Password123!"

echo "Using frontend: $FRONTEND_URL"
echo "Signup payload: email=$TEST_EMAIL phone=$TEST_PHONE"

resp=$(curl -sS -w "\n%{http_code}" -X POST "$FRONTEND_URL/api/auth/signup/" -H 'Content-Type: application/json' -d "{\"first_name\":\"E2E\",\"last_name\":\"Tester\",\"phone\":\"$TEST_PHONE\",\"email\":\"$TEST_EMAIL\",\"password\":\"$PASSWORD\",\"create_chama\":false,\"chama_name\":\"\",\"chama_type\":\"\"}")
body=$(echo "$resp" | sed '$d')
code=$(echo "$resp" | tail -n1)

echo "Signup HTTP $code"
echo "$body"

if [ "$code" -eq 201 ]; then
  echo "Signup succeeded, attempting token login"
  login=$(curl -sS -X POST "$FRONTEND_URL/api/token/" -H 'Content-Type: application/json' -d "{\"username\":\"$TEST_EMAIL\",\"password\":\"$PASSWORD\"}")
  echo "Login response: $login"
  exit 0
else
  echo "Signup failed"
  exit 1
fi
