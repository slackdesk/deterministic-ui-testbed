import json, sys

data = json.loads(sys.stdin.read() or "{}")

# Hard requirements for "smoke passed"
if not data.get("ok"):
    print("FAIL: ok=false", file=sys.stderr)
    sys.exit(1)

status = data.get("http_status")
if status is None or int(status) >= 400:
    print(f"FAIL: bad http_status={status}", file=sys.stderr)
    sys.exit(1)

# Soft requirements (warn but don't fail)
warnings = []
if data.get("console_errors", 0) > 0:
    warnings.append(f"console_errors={data.get('console_errors')}")
if data.get("page_errors", 0) > 0:
    warnings.append(f"page_errors={data.get('page_errors')}")
if data.get("dom_ready_ms") is not None and int(data["dom_ready_ms"]) > 5000:
    warnings.append(f"slow dom_ready_ms={data['dom_ready_ms']}")

if warnings:
    print("WARN: " + ", ".join(warnings), file=sys.stderr)

print("PASS")
