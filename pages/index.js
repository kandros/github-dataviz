import React from 'react'
import Pie from '../components/pie'

export default () =>
  <div className="container">
  <style jsx>{`
:global(body) {
font-family: sans-serif;
        margin: 0;
        height: 100vh;
}
h2 {
color: #504d8f;
margin-bottom: 12px;
}
h3 {
color: #527eae;
margin-top : 0;
}
.container {
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}
`}</style>
  <h2>Most used languages</h2>
  <h3>in 2017 public github repos</h3>
<Pie
  width={400}
  height={400}
  margin={{
    top: 30,
    left: 20,
    right: 20,
    bottom: 110,
  }}
/>
  </div>
