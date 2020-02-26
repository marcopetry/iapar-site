export function formatarDadosTecnico(listaTecnicos){
    let dadosFormatados = [];
    listaTecnicos.map(tecnico => {
        return dadosFormatados.push({
            id: tecnico.id,
            nome: tecnico.nome,
            email: tecnico.email,
            cidade: tecnico.cidade,
            telefone: tecnico.telefone,
            tipoDoc: tecnico.tecnico.tipo_registro,
            numeroDocumento: tecnico.tecnico.registro_profissional,
            anoFormacao: tecnico.tecnico.ano_formatura
        });
    }); 
    return dadosFormatados;
}