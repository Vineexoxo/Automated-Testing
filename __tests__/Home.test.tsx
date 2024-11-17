import {render,screen} from '@testing-library/react'
import Home from '@/app/page'
import '@testing-library/jest-dom';

test('it should have Striide text', () =>{
    render(<Home />)

    const myElem =screen.getByText('Striide')

    expect(myElem).toBeInTheDocument()
}
)


test('it should have Log in text', () =>{
    render(<Home />)

    const myElem =screen.getByText('Log in')

    expect(myElem).toBeInTheDocument()
}
)
test('it should have Sign Up text', () =>{
    render(<Home />)

    const myElem =screen.getByText('Sign up')

    expect(myElem).toBeInTheDocument()
}
)