export const headerListTecnicos = [
    { 
        id: 'nome', 
        label: 'Nome', 
        minWidth: 170, 
        numeric: false, 
        align: 'center'
    },
    { 
        id: 'tipoDoc', 
        label: 'Tipo', 
        minWidth: 50, 
        numeric: false,
        align: 'center' 
    },
    {
        id: 'numeroDocumento',
        label: 'Registro',
        minWidth: 100,
        align: 'center',
        numeric: false,
        format: value => value.toLocaleString(),
    },
    {
        id: 'anoFormacao',
        label: 'Ano Formação',
        minWidth: 150,
        align: 'center',
        numeric: false,
    },
    {
        id: 'cidade',
        label: 'Cidade',
        minWidth: 170,
        align: 'center',
        numeric: false,
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'center',
        numeric: false,
    },
    {
        id: 'telefone',
        label: 'Telefone',
        minWidth: 100,
        align: 'center',
        numeric: false,
    }
];