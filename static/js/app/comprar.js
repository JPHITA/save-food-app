window.onload  =  ()  =>  {
    let tienda = parseInt(sessionStorage.getItem( "tienda" ));
    let menu = parseInt(sessionStorage.getItem( "menu" ));

    let img_menu = document.getElementById("img-menu");
    let title_menu = document.getElementById("title-menu");
    let calendar_menu = document.getElementById("calendar-menu");
    let prize_menu = document.getElementById("prize-menu");

    let img_tienda = document.getElementById("img-tienda");
    let address_tienda = document.getElementById("address-tienda");

    img_tienda.src = `img/app/index/${cards[tienda].title}/logo.jpg`;
    address_tienda.innerHTML = cards[tienda].address;

    img_menu.src = `img/app/index/${cards[tienda].title}/${menu+1}.jpg`;
    calendar_menu.innerHTML = cards[tienda].menus[menu].calendar;
    title_menu.innerHTML = cards[tienda].menus[menu].title;
    prize_menu.innerHTML = cards[tienda].menus[menu].prize;
}


async function Reservar(){
    await Swal.fire({
        title: 'Listo!',
        html: 'Con tu compra haz evitado que <b>2 KG</b> de comida se desperdicien',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      sessionStorage.setItem("reserva", true);

      location.assign("/");
}