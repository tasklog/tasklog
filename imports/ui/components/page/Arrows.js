import Arrow from '/imports/ui/components/page/Arrow'
import Title from '/imports/ui/components/page/Title'
import React from 'react'

const Arrows = ({ title }) => (
    <div className='arrows'>
        <Arrow direction='left' />
        <Title>{title}</Title>
        <Arrow direction='right' />
    </div>
)

export default Arrows