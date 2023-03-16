import React from 'react';

class Loading extends React.Component{
    render(){
        return(
            <div className='d-flex flex-column justify-content-center align-items-center border rounded p-3'>
                <div
                    className='spinner-border text-primary'
                    role="status"
                    style={{width: '3rem', height: '3rem'}}
                >
                    <span className='visually-hidden'>Carregando...</span>
                </div>
                <p className='mt-3 text-primary'>{this.props.mensagem}</p>
            </div>
        )
    }
}

Loading.defaultProps = {
    mensagem: 'Carregando'
}

export default Loading