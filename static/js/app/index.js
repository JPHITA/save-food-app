window.onload = () => {
    var cards_container = document.getElementById('cards-container');

    let card_element = "";
    cards.forEach((card, i) => {

        card_element += `
            <div class="row">
                <div class="col-12">

                    <div class="card shadow mb-4">

                        <!-- Card Header - Dropdown -->
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">

                            <img src="img/app/index/${card.title}/logo.jpg" class="rounded float-left" height="50" width="50" alt="">
                            <h4 class="m-0 font-weight-bold text-primary">${card.title}</h4>

                            <div class="dropdown no-arrow">
                                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                    aria-labelledby="dropdownMenuLink">
                                    <div class="dropdown-header">Dropdown Header:</div>
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>

                        </div>

                        <!-- Card Body -->
                        <div class="card-body">

                            <div id="Corousel${card.title}" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
        `;

        card.menus.forEach((menu, j) => {
            card_element += `
                <div class="carousel-item ${j==0?"active":""}">
                
                    <div class="row">
                        <div class="col-12">
                            <img onclick="comprar(${i}, ${j})" class="d-block w-100" src="img/app/index/${card.title}/${j+1}.jpg"
                                height="300" alt="">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-1">
                            <i class="fa fa-hamburger"></i>
                        </div>
                        <div class="col-7">
                            <h5>
                                <b>${menu.title}</b>
                            </h5>
                        </div>

                        <div class="col-4 ">
                            <b>${menu.prize}</b>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-1">
                            <i class="fa fa-calendar-day"></i>
                        </div>
                        <div class="col-11">
                            ${menu.calendar}
                        </div>
                    </div>

                </div>
            `;
        });

        card_element += `
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
        `;
    });

    cards_container.innerHTML += card_element;

    $(".carousel").carousel({ interval: 3500 });

    // verificar si hay una reserva
    if (sessionStorage.getItem("reserva") != null) {
        Swal.fire({
            icon: 'success',
            html: `
                <h4>Reserva realizada con éxito</h4>

                <h6>¿Te gustaria Calificar tu experiencia en la aplicación?</h6>
                <span id="star-1" onmouseover="calificar_exp(1)" class="fa fa-star"></span>
                <span id="star-2" onmouseover="calificar_exp(2)" class="fa fa-star"></span>
                <span id="star-3" onmouseover="calificar_exp(3)" class="fa fa-star"></span>
                <span id="star-4" onmouseover="calificar_exp(4)" class="fa fa-star"></span>
                <span id="star-5" onmouseover="calificar_exp(5)" class="fa fa-star"></span>
            `,
            showConfirmButton: true,
        });

        sessionStorage.removeItem("reserva");
    }
}

function comprar(tienda, menu) {
    sessionStorage.setItem("tienda", tienda);
    sessionStorage.setItem("menu", menu);

    window.location.assign("/comprar");
}



function calificar_exp(star) {
    let stars = document.querySelectorAll("#star-1, #star-2, #star-3, #star-4, #star-5");

    stars.forEach( s => { s.classList.remove("checked") })

    for (let i = star-1; i >= 0; i--) {
        stars[i].classList.add("checked");
        
    }
}