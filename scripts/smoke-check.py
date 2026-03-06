#!/usr/bin/env python3
import sys
import json

REQUIRED_KEYS = [
    "url",
    "ok",
    "title",
    "h1",
    "http_status",
    "final_url",
    "dom_ready_ms",
    "console_errors",
    "page_errors",
]

def as_str(v):
    return "" if v is None else str(v)

def as_int(v):
    try:
        if v is None:
            return 0
        # handle strings like "200"
        return int(float(v))
    except Exception:
        return 0

def as_bool(v):
    return bool(v)

def normalize(obj):
    out = {
        "url": as_str(obj.get("url")),
        "ok": as_bool(obj.get("ok")),
        "title": as_str(obj.get("title")),
        "h1": as_str(obj.get("h1")),
        "http_status": as_int(obj.get("http_status")),
        "final_url": as_str(obj.get("final_url")),
        "dom_ready_ms": as_int(obj.get("dom_ready_ms")),
        "console_errors": as_int(obj.get("console_errors")),
        "page_errors": as_int(obj.get("page_errors")),
    }
    # Optionally enforce ok based on status + page_errors if you want strictness:
    # out["ok"] = (out["http_status"] > 0 and out["http_status"] < 400 and out["page_errors"] == 0)
    return out

def main():
    raw = sys.stdin.read().strip()

    fallback = {
        "url": "",
        "ok": False,
        "title": "",
        "h1": "",
        "http_status": 0,
        "final_url": "",
        "dom_ready_ms": 0,
        "console_errors": 0,
        "page_errors": 1,
    }

    if not raw:
        sys.stdout.write(json.dumps(fallback, separators=(",", ":")))
        return 0

    try:
        data = json.loads(raw)
        if not isinstance(data, dict):
            raise ValueError("Input JSON is not an object")
    except Exception:
        sys.stdout.write(json.dumps(fallback, separators=(",", ":")))
        return 0

    # If extra keys exist, we ignore them — output is strictly the contract.
    out = normalize(data)

    # Ensure required keys exist (they do via normalize)
    sys.stdout.write(json.dumps(out, separators=(",", ":")))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())