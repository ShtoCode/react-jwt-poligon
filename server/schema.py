instructions = [
    "SET CONSTRAINTS ALL DEFERRED;",
    "DROP TABLE IF EXISTS usuario;",
    "SET CONSTRAINTS ALL IMMEDIATE;",
    """
        CREATE TABLE usuario(
            usuario_id SERIAL PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(250) NOT NULL
        );
    """
]