import os

from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL:
    raise Exception("SUPABASE_URL missing in .env")

if not SUPABASE_KEY:
    raise Exception("SUPABASE_KEY missing in .env")

print("SUPABASE_URL =", repr(SUPABASE_URL))
print("SUPABASE_KEY exists =", bool(SUPABASE_KEY))

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)