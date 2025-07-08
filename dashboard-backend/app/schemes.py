from pydantic import BaseModel


class DashboardItem(BaseModel):
    id: int
    cols: int
    rows: int
    y: int
    x: int
    content: str
    type: str | None = None
    chartType: str | None = None
    data: dict | None = None
    file: str | None = None
    title: str | None = None
