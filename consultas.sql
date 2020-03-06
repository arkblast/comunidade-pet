-- GET /usuarios
select * from usuarios;

-- GET /usuarios/:id
select & from usuarios where id = 1;

--POST /usuarios
INSERT INTO usuarios (id, nome, idade)
VALUES(1, 'JOAO', 13);