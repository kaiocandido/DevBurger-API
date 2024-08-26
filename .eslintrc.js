module.exports = {
  env: {
    browser: true, // Configura o ambiente para o navegador
    es2021: true, // Configura a versão do ECMAScript
  },
  extends: [
    'eslint:recommended', // Regras recomendadas do ESLint
    'plugin:prettier/recommended', // Integração com Prettier
  ],
  parserOptions: {
    ecmaVersion: 12, // Define a versão do ECMAScript
    sourceType: 'module', // Permite o uso de módulos ES6
  },
  rules: {
    // Regras personalizadas do ESLint
    'no-console': 'warn', // Emite um aviso ao usar console.log
    'no-unused-vars': 'warn', // Emite um aviso para variáveis não usadas
    'no-console': 'warn', // Emite um aviso quando `console` é usado
    semi: ['error', 'always'], // Requer o uso de ponto e vírgula
    quotes: ['error', 'single'], // Exige o uso de aspas simples
    indent: ['error', 1], // Exige indentação de 2 espaços
    eqeqeq: ['error', 'always'], // Exige o uso de "===" em vez de "=="
    indent: ['error', 2], // Corrige a indentação
    quotes: ['error', 'single'], // Corrige o uso de aspas
  },
}
