from supabase import create_client, Client

from app.config import SupabaseConfig, config


def create_supabase_authorized_client(config: SupabaseConfig) -> Client:
    supabase: Client = create_client(config.url, config.key)
    user_data = {"email": config.user_email, "password": config.user_password}
    supabase.auth.sign_in_with_password(user_data)
    return supabase

supabase = create_supabase_authorized_client(config)
