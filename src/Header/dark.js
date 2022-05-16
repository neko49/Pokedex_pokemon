import {lightTheme,darkTheme,GlobalStyles} from './theme'
import styled, { ThemeProvider } from "styled-components";
import React, { useState } from 'react';
import './Header.css';

const StyledApp = styled.div`

color: ${(props) => props.theme.fontColor};

`;



        function Dark() {



        const [theme, setTheme] = useState("light");

        const themeToggler = () => {

          theme === "light" ? setTheme("dark") : setTheme("light");

        };

        return (



                  <div className='#'>

                      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>

                        <StyledApp>

                            <GlobalStyles />

                            <button className="darkmode" onClick={() => themeToggler()}>Darkmode</button>

                        </StyledApp>

                      </ThemeProvider>

                  </div>



                    )

                }

        export default Dark
