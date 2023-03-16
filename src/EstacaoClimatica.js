import React from 'react';

class EstacaoClimatica extends React.Component {
    time = null;
    state = {
        data: null,
    }

    componentDidMount () {
        this.timer = setInterval(() => {
            this.setState({ data: new Date().toLocaleTimeString()})
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        return (
        <div className="card">
            <div className='card-body'>
                <div
                    className='d-flex align-items-center border rounded mb-2'
                    style={{ height: '6rem' }}
                >
                    <i className={`fas fa-5x ${this.props.icone}`}></i>
                    <p className='w-75 ms-3 text-center fs-1'>{this.props.estacao}</p>
                </div>
                <div>
                    <p className='text-center'>
                        {
                            this.props.lat ?
                                `Coordenadas: ${this.props.lat}, ${this.props.long}. Data: ${this.state.data}.` :
                                this.props.mensagemDeErro ??
                                `Clique no botão para saber a sua estação climática`
                        }
                    </p>
                </div>
            </div>
            <button
                className='btn btn-outline-primary w-100 mt-2'
                onClick={this.props.obterLocalizacao}
            >
                Qual a minha estação
            </button>
        </div>
        )
    }
}

export default EstacaoClimatica;