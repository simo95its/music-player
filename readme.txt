Sono riuscita a stampare la lista delle canzoni ma non va questo:

  li_song.onclick = updateSource(li_song.id);  in index linea 147

lui prova a caricare la funzione ma essendo che l'elemento li non � ancora
stato creato non riesce.
Dice che l'elemento che ho scritto sotto della funzione UpdateSource � undefined
   document.getElementById(id).getAttribute('value');  in main.js linea 47

quindi o facciamo tipo che la funzione parti con un event listener cos� da non doverlo scrivere nell'html oppure non so
domani provo 

--------------------------------------------------------
ah poi mi � comparso anche questo errore
(index):1 Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22

penso cliccando sul tasto play