from typing import Optional, Union
import datetime

class User:
    def __init__(
            self,
            name: str,
            birthdate: Union[str, datetime.datetime],
            email:str,
            password,
            gender:Optional[str] = None
