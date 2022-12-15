import React from 'react'

function Card() {
  return (
    <div class="grid">
  <div class="grid__item">
    <div class="card"><img class="card__img" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80" alt="Snowy Mountains"/>
      <div class="card__content">
        <h1 class="card__header">A starry night</h1>
        <p class="card__text">Look up at the night sky, and find yourself <strong>immersed</strong> in the amazing mountain range of Aspen.</p>
        <button class="card__btn">Explore <span>&rarr;</span></button>
      </div>
    </div>
  </div>
  
  
</div>
  )
}

export default Card