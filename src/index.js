import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
//imrd
import ReactDOM from 'react-dom';
import EstacaoClimatica from './EstacaoClimatica';
import Loading from './Loading';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            lat: null,
            long: null,
            estacao: null,
            data: null,
            icone: null,
        }

        console.log('constructor')
    }

    componentDidMount(){
        this.obterLocalizacao()
    }

    componentDidUpdate(){
        console.log('componentDidUpdate')
    }
    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    obterEstacao = (data, lat) => {
        const anoAtual = data.getFullYear();
        //23/06
        const d1 = new Date(anoAtual, 5, 23)

        //24/09
        const d2 = new Date(anoAtual, 8, 24)

        //22/12
        const d3 = new Date(anoAtual, 11, 22)

        //21/03
        const d4 = new Date(anoAtual, 2, 21)
        const sul = lat < 0

        if(data >= d1 && data < d2) {
            return sul ? 'Inverno' : 'Verão'
        }

        if(data >= d2 && data < d3) {
            return sul ? 'Primavera' : 'Outono'
        }

        if(data >= d4 && data < d1) {
            return sul ? 'Outono' : 'Primavera'
        }

        return sul ? 'Verão' : 'Inverno'
    }

    icones = {
        'Primavera': 'fa-seedling',
        'Verão': 'fa-umbrella-beach',
        'Outono': 'fa-tree',
        'Inverno': 'fa-snowman'
    }

    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition((position) => {
            const data = new Date()
            const estacao = this.obterEstacao(data, position.coords.latitude)
            const icone = this.icones[estacao]

            this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude,
                estacao: estacao,
                data: data.toLocaleString(),
                icone: icone,
            })
        }, (erro) => {
            this.setState({
                mensagemDeErro: 'Tente novamente mais tarde'
            })
        })
    }


    render() {
        console.log('render')
        return(
            <div className='container border mt-2'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-md-8'>
                        {!this.state.lat && !this.state.mensagemDeErro ? 
                            (<Loading mensagem="Por favor, responda à solicitação de localização"/>)
                            : this.state.mensagemDeErro ?
                            (<p className='border.rounded p-2 fs-1 text-center'>
                                É preciso dar permissao para acesso à localização. Atualize a página e tente de novom ajustando a configuração no seu navegador
                            </p>) : (
                                <EstacaoClimatica 
                                    icone={this.state.icone}
                                    estacao={this.state.estacao}
                                    lat={this.state.lat}
                                    long={this.state.long}
                                    data={this.state.data}
                                    mensagemDeErro={this.state.mensagemDeErro}
                                    obterLocalizacao={this.state.obterLocalizacao}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)