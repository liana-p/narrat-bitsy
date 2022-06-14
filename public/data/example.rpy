main:
  talk helper idle "Hello world"
  talk helper idle "This is the demo game for the bitsy plugin. We'll be moving in and out of bitsy to see how bitsy and narrat can communicate."
  talk helper idle "Moving to the bitsy game now"
  show_bitsy

bitsyTest:
  hide_bitsy
  talk helper idle "It's working!"
  choice:
    "Go back to bitsy?"
    "yes":
      show_bitsy
    "no":
      jump main
