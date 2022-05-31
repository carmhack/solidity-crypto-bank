
function Login({ connect }) {
    return (
        <section className="section">
            <div className="columns">
                <div className="column is-4 is-offset-4">
                    <div className="box has-text-centered">
                        <h3 className="subtitle is-4">Connetti il tuo account MetaMask</h3>
                        <button className="button is-info" onClick={connect}>Connect</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;