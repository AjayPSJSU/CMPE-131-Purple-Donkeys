import { render, screen, cleanup } from '@testing-library/react'
import Login from "../Login"
import userEvent from '@testing-library/user-event'
import {BrowserRouter as Router} from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';


test('should render login background and cover components', () => {
    render(
        <Router>
          <Login />
        </Router>,
      );
    const loginElement = screen.getAllByTestId('cvr');
    expect(loginElement).toBeTruthy()
  })

  test('Upon clicking guest button, show guest message', async () =>  {
    render(
        <Router>
          <Login />
        </Router>,
      );
      await userEvent.click(screen.getByText("Continue as Guest"))
      expect(screen.getByText('You are a Guest! Redirecting to main page...')).toBeVisible()
  })

  /*                                                                            INTENDED TO FAIL 
  test('Upon clicking guest button, show guest message', async () =>  {
    render(
        <Router>
          <Login />
        </Router>,
      );
      await userEvent.click(screen.getByText("Continue as Guest"))
      expect(screen.getByText('You are a Guest! Redirecting to main page...')).toBeVisible()
  })
  */


