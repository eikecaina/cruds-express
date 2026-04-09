Controllers

Responsabilidade:
- Receber req e res do Express.
- Chamar services ou models.
- Retornar resposta HTTP.

Deve conter:
- usersController.ts
- productsController.ts
- outros controllers por entidade

Nao deve conter:
- Regra de negocio pesada.
- Acesso direto complexo ao banco, quando houver service/repository.
