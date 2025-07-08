from pydantic_settings import BaseSettings


class SupabaseConfig(BaseSettings):
    url: str
    key: str
    user_email: str
    user_password: str

    class Config:
        env_file = ".env"
        env_prefix = "supabase_"


config = SupabaseConfig()
