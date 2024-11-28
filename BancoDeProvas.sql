CREATE TABLE Aluno
( 
 Curso INT NOT NULL,  
 Ingresso INT NOT NULL,  
 RA INT NOT NULL PRIMARY KEY,  
 Nome varchar(128) NOT NULL  
); 

CREATE TABLE Prova 
( 
 Sigla varchar(5) NOT NULL,  
 Ano INT,  
 Semestre INT,
 Resolvida_ou_nao BOOLEAN,  
 RA INT,  
 idProfessor INT,
 url_prova TEXT NOT NULL,
 idProva SERIAL PRIMARY KEY
); 

CREATE TABLE Professor 
( 
 Instituto varchar(5) NOT NULL,  
 Nome varchar(128) NOT NULL,
 idProfessor INT NOT NULL PRIMARY KEY  
); 

CREATE TABLE Resposta 
(  
 idProva INT NOT NULL,  
 RA INT NOT NULL,
 idProfessor INT NOT NULL,
 url_resposta TEXT,
 PRIMARY KEY(idProva, RA, idProfessor)
);

CREATE TABLE Avalia 
( 
 avaliacao TEXT NOT NULL,
 idProva INT NOT NULL,  
 RA INT NOT NULL,
 PRIMARY KEY (idProva, RA)
); 

ALTER TABLE Prova ADD FOREIGN KEY(RA) REFERENCES Aluno (RA);
ALTER TABLE Prova ADD FOREIGN KEY(idProfessor) REFERENCES Professor (idProfessor);
ALTER TABLE Resposta ADD FOREIGN KEY(idProva) REFERENCES Prova (idProva);
ALTER TABLE Resposta ADD FOREIGN KEY(RA) REFERENCES Aluno (RA);
ALTER TABLE Resposta ADD FOREIGN KEY(idProfessor) REFERENCES Professor (idProfessor);
ALTER TABLE Avalia ADD FOREIGN KEY(idProva) REFERENCES Prova (idProva);
ALTER TABLE Avalia ADD FOREIGN KEY(RA) REFERENCES Aluno (RA);
