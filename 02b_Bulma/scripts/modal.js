/* CSCI 3230U - CSS Frameworks */
$(document).ready(function() {
   var rootEl = document.documentElement;
   var $modalButtons = getAll('.modal-button');
   var $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');

   if ($modalButtons.length > 0) {
     $modalButtons.forEach(function ($el) {
       console.log("setting click handler for " + $el);
       $el.addEventListener('click', function () {
         var target = $el.dataset.target;
         openModal(target);
       });
     });
   }

   if ($modalCloses.length > 0) {
     $modalCloses.forEach(function ($el) {
       $el.addEventListener('click', function () {
         closeModals();
       });
     });
   }


   document.addEventListener('keydown', function (event) {
     var e = event || window.event;
     if (e.keyCode === 27) {
       closeModals();
       closeDropdowns();
     }
   });
});

function openModal(target) {
  var $target = document.getElementById(target);
  var rootEl = document.documentElement;
  rootEl.classList.add('is-clipped');
  $target.classList.add('is-active');
}

function closeModals() {
  var rootEl = document.documentElement;
  rootEl.classList.remove('is-clipped');
  getAll('.modal').forEach(function ($el) {
    $el.classList.remove('is-active');
  });
}

function getAll(selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}
