import { render } from '@testing-library/react'
import { mount, shallow } from 'enzyme'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'

import Header from '../index'

describe('<Header />', () => {
    it('renders', () => {
        const tree = render(
            <MemoryRouter>
                <Header>
                    <div className="text" />
                </Header>
            </MemoryRouter>
        ).container.firstChild
        expect(tree).toMatchSnapshot()
    })
    it('renders', () => {
        const tree = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        ).container.firstChild
        expect(tree).toMatchSnapshot()
    })

    it('renders', () => {
        const tree = render(
            <MemoryRouter>
                <Header>
                    <div>test</div>
                    <div>test2</div>
                </Header>
            </MemoryRouter>
        ).container.firstChild
        expect(tree).toMatchSnapshot()
    })
    it('test click jump', () => {
        const header = mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        )
        header.find('div').simulate('click')
        expect(header.find('div')).toHaveLength(1)
    })
})
