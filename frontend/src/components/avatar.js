import React, {Component} from 'react'
import {skinny, striped, slender, spotted, sporty, stocky, patchy, plain} from '../assets/index';

const propertyMap = {
    backgroundColor: {black: '#263238', white: '#CFDADC', green: '#A5D6A7', blue: '#0277BD'},
    build: {slender: slender, stocky: stocky, sporty: sporty, skinny: skinny},
    pattern: {plain: plain, striped: striped, spotted: spotted, patchy: patchy},
    size: {small: 50, medium: 70, large: 90, enormous: 110}
};

class DragonAvatar extends Component {


    get DragonImage() {
        const DragonPropertyMap = {};

        this.props.dragon.traits.forEach(trait => {
            DragonPropertyMap[trait.traitType] = propertyMap[trait.traitType][trait.traitValue];
        });

        const size = DragonPropertyMap.size
        const sizing = {width: size, height: size};

        return (
            <div className='dragon-avatar-image-wrapper'>
                <div style={{backgroundColor: DragonPropertyMap.backgroundColor, ...sizing}}
                     className='dragon-avatar-image-background'></div>
                <img src={DragonPropertyMap.pattern} className='dragon-avatar-image-pattern' style={{...sizing}}/>
                <img src={DragonPropertyMap.build} className='dragon-avatar-image' style={{...sizing}}/>
            </div>
        );
    }

    render() {
        console.log('Current dragon: ', this.props.dragon);
        const {generationId, dragonId, traits} = this.props.dragon;
        if (!dragonId) {
            return (<div></div>)
        }
        return (<div>
            <span>G: {generationId}.</span>
            <span>I: {dragonId}.</span>
            {traits.map(trait => trait.traitValue).join(', ')}
            {this.DragonImage}
        </div>);
    }
}

export default DragonAvatar;