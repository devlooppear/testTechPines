# Iniciando

Para iniciar o projeto, siga os passos abaixo:

1. **Configure o arquivo de ambiente**:
   Crie um arquivo de configuração de ambiente a partir do exemplo fornecido. O arquivo `.env` conterá variáveis importantes para a configuração do projeto.

    ```bash
    cp .env.example .env
    ```

Inicie os containers Docker:
Use o Docker Compose para iniciar os containers definidos no arquivo docker-compose.yml. Isso configurará o ambiente de desenvolvimento com todos os serviços necessários.

```bash
docker compose up
```

Instale as dependências do Laravel:
Acesse o container do Laravel e execute o comando para instalar as dependências do Composer.

```bash
docker exec -it back-end-laravel.test-1 composer install
```

Execute as migrations e seeders:
Ainda no container do Laravel, execute o comando para aplicar as migrations e popular o banco de dados com dados iniciais.

```bash
docker exec -it back-end-laravel.test-1 php artisan migrate:fresh --seed
```
