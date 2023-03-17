import React from 'react'




export default class Home extends React.Component {
    constructor(props) {

        super(props);

        this.handleCardFace = this.handleCardFace.bind(this)
        this.handleCardRear = this.handleCardRear.bind(this)
        this.clearDefaultText = this.clearDefaultText.bind(this)
        this.toggleLog = this.toggleLog.bind(this)

        this.state = {
            front: 'Front of Card',
            back: 'Back of Card',
            logOpen: false
        }

    }

    handleCardFace(e) {

        e.preventDefault()

        this.setState({ front: e.target.value })

    }

    handleCardRear(e) {

        e.preventDefault()

        this.setState({ back: e.target.value })

    }

    clearDefaultText(e, key) {

        if (key == 'reset') {
            this.setState({
                back: 'Back of Card',
                front: 'Front of Card'
            })
        }

        e.preventDefault()

        this.setState({ [key]: '' })

    }



    toggleLog(e) {

        e.preventDefault()

        const prev = this.state.logOpen



        if (prev) {

            this.setState({ logOpen: false })
            console.log('cum off')

        }

        else {

            this.setState({ logOpen: true })
            console.log("cum on")

        }
    }



    render() {

        const dfault = <div className={`flex flex-col col-span-${this.state.logOpen ? 6 : 4} gap-4 h-full w-full place-content-center place-items-center justify-center`}>

            <div className="flex flex-row gap-5 bg-white place-items-center justify-center">

                <div className="flex bg-slate-500 border-2 justify-center place-items-center border-black">

                    <input className="text-gray-400 text-center w-full h-full p-6" type="text" onClick={(event) => this.clearDefaultText(event, 'front')} onChange={(event) => this.handleCardFace(event)} value={this.state.front} />

                </div>

                <div className="flex bg-slate-500 border-2 justify-center place-items-center border-black">

                    <input className="text-gray-400 text-center w-full h-full p-6" type="text" onClick={(event) => this.clearDefaultText(event, 'back')} onChange={(event) => this.handleCardRear(event)} value={this.state.back} />

                </div>

            </div>

            <div className='flex flex-row gap-2 w-1/2 bg-white place-items-center justify-around'>

                <button className='border border-black w-20 p-2'> Submit </button>

                <button className='border border-black w-20 p-2' onClick={(event) => this.clearDefaultText(event, 'reset')}> Reset </button>

                <button className='border border-black w-20 p-2' onClick={(event) => this.toggleLog(event)}>Log</button>

            </div>
        </div>





        /* ################################################################################################################################################################## */





        return (

            <div className='flex w-screen h-screen place-items-center justify-center'>

                {dfault}

            </div>











        )
    }
}