[CATEGORÍA] Accion en turno
[[cambiar-arma]]
[TIPO] Accion simple
<<COSTO>> 1 de estamina
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
[TAGS] Accion_adicional | Weapons | Shields
[DESCRIPCIÓN] Cuesta 1 de estamina. Puedes cambiar entre tu arma principal y secundaria, retirar un escudo para usar un arma de dos manos, o volver a equipar un escudo.

---

[[interactuar-con-entorno]]
[TIPO] Accion simple
<<COSTO>> 1 de estamina
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
[TAGS] Accion_adicional
[DESCRIPCIÓN] Cuesta 1 de estamina. Puedes recoger tu arma si fuiste desarmado, tomar un objeto del suelo, jalar una palanca, o cualquier otra acción que implique interacción con el entorno.

---

[[recargar]]
[TIPO] Accion simple
<<COSTO>> 1 de estamina
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
[TAGS] Accion_adicional | Weapons
[DESCRIPCIÓN] Cuesta 1 de estamina. Usas esta acción para recargar un arma que requiera munición. La cantidad de municion recargada en cada accion viene marcada en los datos del arma.

---

[[usar-habilidad]]
[TIPO] Accion simple
<<COSTO>> 1 de estamina
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
[TAGS] Accion_adicional | Validar_con_GM
[DESCRIPCIÓN] Cuesta 1 de estamina. Realizas una acción que utiliza una habilidad específica, como investigar al enemigo, detectar peligros o realizar una acción que requiere una habilidad especial. Estas habilidades pueden proporcionar información adicional o ventajas tácticas.

---

[[usar-objeto]]
[TIPO] Accion simple
<<COSTO>> 1 de estamina
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
[TAGS] Accion_adicional | Items
[DESCRIPCIÓN] Cuesta 1 de estamina. Realiza una acción como tomar una poción, usar un antídoto, lanzar una granada, impregnar tu arma con veneno, entre otros.

---

[[weapon-transformation]]
[TIPO] Accion simple
<<COSTO>> 1 de estamina
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
[TAGS] Accion_adicional | Weapons
[DESCRIPCIÓN] Cuesta 1 de estamina. Si el arma permite intercambiar entre diferentes formas, esta acción permite cambiar la forma actual de esta.

---

[[correr]]
[TIPO] Accion simple
<<COSTO>> 1 de estamina
<<REPETIR>> 1/turno
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> 1/turno
<<EXCLUSIÓN>> Ninguno
[TAGS] Movement_Actions
[DESCRIPCIÓN] description: Cuesta 1 de estamina. El personaje puede moverse adicionalmente su velocidad de movimiento regular con la condición de que sea en una línea recta o semirrecta. Solo puede usarse una vez por turno.

---

[[desenganchar]]
[TIPO] Accion simple
<<COSTO>> 2 de estamina
<<REPETIR>> ilimitada
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> ilimitada
<<EXCLUSIÓN>> Ninguno
[TAGS] Movement_Actions
[DESCRIPCIÓN] Cuesta 2 de estamina. El personaje se puede mover 2 casillas sin provocar ataques de oportunidad..

---

[[levantarse]]
[TIPO] Accion simple
<<COSTO>> 1 de estamina
<<REPETIR>> ilimitada
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> ilimitada
<<EXCLUSIÓN>> Ninguno
[TAGS] Movement_Actions
[DESCRIPCIÓN] Cuesta 1 de estamina. Si el personaje está en el estado tumbado puede salir de el con esta accion.

---

[[movimeinto-extra]]
[TIPO] Accion simple
<<COSTO>> 1 de estamina
<<REPETIR>> ilimitada
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> ilimitada
<<EXCLUSIÓN>> Ninguno
[TAGS] Movement_Actions
[DESCRIPCIÓN] Cuesta 1 de estamina. Por cada punto de estamina gastado, el personaje puede moverse 2 casillas adicionales a su movimiento regular.

---

[[movimiento-regular]]
[TIPO] Accion simple
<<COSTO>> No cuesta
<<REPETIR>> 1/turno
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> 1/turno
<<EXCLUSIÓN>> Ninguno
[TAGS] Movement_Actions
[DESCRIPCIÓN] No cuesta estamina. Permite moverte hasta tu velocidad base(6 casillas).

---

[[prueba-de-habilidad]]
[TIPO] Accion simple
<<COSTO>> 1 de estamina
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
<<REPETIR>> Ilimitada
<<EXCLUSIÓN>> Ninguno
[TAGS] Movement_Actions | Validar_con_GM
[DESCRIPCIÓN] Cuesta 1 de estamina. El personaje realiza una tirada de Atletismo o alguna otra habilidad para ejecutar movimientos especializados como saltar, escalar, nadar, etc.

---

[/CATEGORÍA]

[CATEGORÍA] Accion fuera de turno
[[aturdir]]
[TIPO] Reaccion
<<Detonante>> Ataque enemigo contra tu personaje
<<Tirada>> Cualquier tirada de defensa fisica
<<Tirada Enemiga>> Caulquier tirada de ataque
<<Super Exito>> El enemigo además gana el estado vulnerable, hasta recibir un ataque o hasta el inicio de su turno.
[TAGS] Defensive_Reactions | Physical_Defensive_Skills | Ofensive_Skills | Ailments
[DESCRIPCIÓN] description: Cuesta 3 de estamina. Tirada: Fortitude or Reflexes Tienes desventaja en la tirada. No hace daño. Aprovechas el momento oportuno para realizar un contrataque devastador, si la accion tiene éxito, ignoras daño y el enemigo gana el estado aturdido. Super Éxito: El enemigo además gana el estado vulnerable, hasta recibir un ataque o hasta el inicio de su turno.

---

[[bloquear]]
[TIPO] Reaccion
<<Detonante>> Ataque enemigo contra tu personaje
<<Tirada>> Fortitude
<<Tirada Enemiga>> Caulquier tirada de ataque
<<Super Exito>> Recuperas el punto de estamina utilizado.
[TAGS] Defensive_Reactions | Skills | Ofensive_Skills
[DESCRIPCIÓN] description: Cuesta 1 de estamina. Tirada: Fortitude or Reflexes Puedes usar un escudo o un arma para desviar el daño recibido. Si se tiene éxito en la tirada anula completamente el ataque. Super éxito: Recuperas el punto de estamina utilizado.

---

[[contragolpe]]
[TIPO] Reaccion
<<Detonante>> Ataque enemigo contra tu personaje
<<Tirada>> Caulquier tirada de ataque
<<Tirada Enemiga>> Caulquier tirada de ataque
<<Super Exito>> Logras evitar el daño del ataque enemigo.
[TAGS] Defensive_Reactions | Ofensive_Skills | Basic_Attack | Traits
[DESCRIPCIÓN] description: Cuesta 1 de estamina mas el costo del ataque. Tirada: Attack skill(Might, Presicion, Focus, Evoke) Solo se pueden usar ataques del armma que esten marcados como basicos. Sin miedo a nada decides recibir el ataque del enemigo aprovechando la oportunidad para tu tambien conectar un golpe contra el. Si se tiene éxito en la tirada tanto tu como tu enemigo reciben el daño indicado en el ataque. Super éxito: Logras evitar el daño del ataque enemigo.

---

[[esquivar]]
[TIPO] Reaccion
<<Detonante>> Ataque enemigo contra tu personaje
<<Tirada>> Reflexes
<<Tirada Enemiga>> Caulquier tirada de ataque
<<Super Exito>> Puedes moverte una casilla adicional.
[TAGS] Defensive_Reactions | Skills | Ofensive_Skills | Movement_Actions
[DESCRIPCIÓN] description: Cuesta 1 de estamina. Tirada: Reflexes Intentas esquivar un ataque enemigo. Si tu tirada supera la del atacante, evitas por completo el daño y puedes moverte 1 casilla desde tu posición actual. Super Éxito: Puedes moverte una casilla adicional.

---

[[resistir]]
[TIPO] Reaccion
<<Detonante>> Ataque enemigo contra tu personaje
<<Tirada>> Fortitude
<<Tirada Enemiga>> Caulquier tirada de ataque
<<Super Exito>> Mitigas por completo el daño del ataque, formando una defensa impenetrable.
[TAGS] Defensive_Reactions | Skills | Ofensive_Skills | Armor
[DESCRIPCIÓN] description: Cuesta 1 de estamina\*. Tirada: Fortitude Te preparas para absorber el impacto del ataque enemigo, minimizando el daño recibido. Mitgas puntos de daño igual a tu endurance por cada punto de estamina gastado, esto tiene efecto incluso cuando fallas la tirada. Si tienes exito en la tirada, obtienes una mitigacion extra por cada exito por encima. Super Éxito: Mitigas por completo el daño del ataque, formando una defensa impenetrable.

---

[[riposte]]
[TIPO] Reaccion
<<Detonante>> Ataque enemigo contra tu personaje
<<Tirada>> Caulquier tirada de ataque.
<<Tirada Enemiga>> Caulquier tirada de ataque.
<<Super Exito>> Recuperas un punto de estamina utilizado.
[TAGS] Defensive_Reactions | Skills | Ofensive_Skills | Basic_Attack | Armor | Traits
[DESCRIPCIÓN] description: Cuesta 1 de estamina mas el costo del ataque. Tirada: Attack skill(Might, Presicion, Focus, Evoke) Solo se pueden usar ataques del armma que esten marcados como basicos. Sin miedo a nada decides recibir el ataque del enemigo aprovechando la oportunidad para tu tambien conectar un golpe contra el. Si se tiene éxito en la tirada logras evitar el daño enemigo, ademas de infligir un poco de daño en respuesta, este daño sera igual al daño base indicado en el arma, ignorando la formula de daño del ataque basico utilizado para esta accion. Super éxito: Recuperas un punto de estamina utilizado.

---

[[ataque-de-oportunidad]]
[TIPO] Reaccion
<<Detonante>> El enemigo sale en tu rango de ataque
<<Tirada>> Caulquier tirada de ataque
<<Tirada Enemiga>> Caulquier tirada de defensa
<<Super Exito>> El indicado en el ataque o el Great Success Atack si no esta definido
[TAGS] Defensive_Reactions | Ofensive_Skills | Basic_Attack | Traits
[DESCRIPCIÓN] description: Cuesta 1 de estamina mas el costo del ataque. Tirada: Attack skill(Might, Presicion, Focus, Evoke) Solo se pueden usar ataques del armma que esten marcados como basicos. Realizas un ataque rápido contra un enemigo que ha cometido un error estratégico al moverse fuera de tu rango de ataque.

---

[[ataque-de-precaución]]
[TIPO] Reaccion
<<Detonante>> El enemigo entra en tu rango de ataque y tienes un arma a melee
<<Tirada>> Caulquier tirada de ataque
<<Tirada Enemiga>> Caulquier tirada de defensa
<<Super Exito>> El indicado en el ataque o el Great Success Atack si no esta definido
[TAGS] Defensive_Reactions | Ofensive_Skills | Basic_Attack | Traits
[DESCRIPCIÓN] description: Cuesta 1 de estamina mas el costo del ataque. Tirada: Attack skill(Might, Presicion, Focus, Evoke) Solo se pueden usar ataques del armma que esten marcados como basicos. Este ataque se realiza con armas de alcance melee que permiten atacar a un enemigo mientras entra en tu zona de amenaza. Esta es la version para armas cuerpo a cuerpo o con la propiedad reach.

---

[[tiro-de-precaución]]
[TIPO] Reaccion
<<Detonante>> El enemigo entra en rango de ataque corto y tienes un arma a distancia
<<Tirada>> Caulquier tirada de ataque
<<Tirada Enemiga>> Caulquier tirada de defensa
<<Super Exito>> El indicado en el ataque o el Great Success Atack si no esta definido
[TAGS] Defensive_Reactions | Ofensive_Skills | Basic_Attack | Traits
[DESCRIPCIÓN] description: Cuesta 1 de estamina mas el costo del ataque. Tirada: Attack skill(Might, Presicion, Focus, Evoke) Solo se pueden usar ataques del armma que esten marcados como basicos. Este ataque se realiza con armas de alcance melee que permiten atacar a un enemigo mientras entra en tu zona de amenaza. Esta es la version para armas a distancia y sigue las siguiente reglas: - Un enemigo entra en rango de ataque corto(6 casilla o menos). - El ataque siempre sera consideracion como rango corto. - Aplica para objetos arrojadizos con el ataque throw

---

[/CATEGORÍA]

[CATEGORÍA] Ailments
[[agonizando]]
[TIPO] Ailment
[TAGS] Wounds | Endurance
[DESCRIPCIÓN] Agonizando Te han dado un golpe que ha sobrepasado tus hit-points restantes, por lo que no podrás realizar acciones aun y cuando cuentes con stamina para realizarlas. Haces una prueba de endurance con dificultad igual al numero de heridas abiertas, si se logra te recuperas con hit-points equivalentes a tu umbral de heridas mas tu endurance. Un jugador puedo usar su accion de apoyo para darte ventaja en esta tirada

---

[[aturdido]]
[TIPO] Ailment
[TAGS] Armor | Defensive_Skills | Reactions
[DESCRIPCIÓN] El personaje esta fuera de combate, incapaz de defenderse o usar cualquier reacción, este estado termina al principio de su turno o una vez que se ha recibido daño.

---

[[defensivo]]
[TIPO] Ailment
[TAGS] Defensive_Skills | Dice_Bonuses
[DESCRIPCIÓN] Estado que se obtiene al usar la accion primaria de defensa mejorada

---

[[desestabilizado]]
[TIPO] Ailment
[TAGS] Dice_Penalties
[DESCRIPCIÓN] Te encuentras tambaleando, incapaz de hacer movimientos con precisión, tienes un penalizador de 1 dado a cualquier tirada de ataque o defensa. Una de la formas de eliminar el estado es gastar tu acción de movimiento en ello.

---

[[envenenado]]
[TIPO] Ailment
[TAGS] Continus_Damage
[DESCRIPCIÓN] Al final de tu turno puedes realizar una prueba de tolerancia para mitigar el daño del veneno o incluso quitarte por completo este estado. Cada veneno tiene definida su duración, daño y la dificultad necesaria para contrarrestarlo, estos valores pueden cambiar durante el combate. Por ejemplo, un veneno simple puede pedir un exito en en la tirada de tolerancia o recibir 3 putnos de daño no mitigable durante ese turno, si consigues un super exito en esa tirada el veneno deja de hacer efecto por el resto del combate.

---

[[quemado]]
[TIPO] Ailment
[TAGS] Continuos_Damage
[DESCRIPCIÓN] Recibes 5 puntos de daño de fuego, este daño no puede ser mitigado por armaduras normales, para quitarte el fuego puedes usar tu acción secundaria, tirada de cunning o athetics, superando 2 exitos.

---

[[restringido]]
[TIPO] Ailment
[TAGS] Disvantage
[DESCRIPCIÓN] Tienes desventaja en todas las tiradas de ataque o defensa. Una de la formas de quitarse el estado es con tirada enfrentada(Fortitude vs Fortitude) al inicio de tu turno.

---

[[sangrando]]
[TIPO] Ailment
[TAGS] Continuos_Damage
[DESCRIPCIÓN] Cada punto de sangrado te quita 1 punto de vida al final de tu turno, el sangrado termina automáticamente al terminar la batalla, o pues ir tratándolo con tiradas de supervivencia (a debatir cuanto sangrado te quitas con cada intento y que dificultad representa)

---

[[tumbado]]
[TIPO] Ailment
[TAGS] Movement_Actions
[DESCRIPCIÓN] Movimiento limitado, igual a la mitad de tu velocidad base Los atacantes a melee tienen ventajas Los atacantes a distancia tienen desventaja Tienes desventaja en los ataques a melee

---

[[vulnerable]]
[TIPO] Ailment
[TAGS] Armor | Defensive_Skills | Reactions
[DESCRIPCIÓN] El personaje o enemigo tiene un punto debil visible que puede ser aprovechado, el siguiente ataque que reciba no se vera reducido por la mitigacion de la armudura o equipo que lleve ocupado, le estado se pierde al incio de su turno o cuando la debilidad ha sido usada(al recibir un ataque)

---

[/CATEGORÍA]

[CATEGORÍA] General
[[ataque-basico]]
[TIPO] Rule
[TAGS]
[DESCRIPCIÓN] El ataque basico es el ataque por defecto que tienen todas las armas, se compone del nombre del ataque(aunque muchas armas solo lo llaman ataque basico), las estamina que usa, si se puede usar en una accion secundaria, la habilidad de ataque que debes utilizar y su calculo de daño(aunque normalmente suele ser el daño base del arma mas el modificar del stat base de la habilidad que se usa para la tirada)

---

[[great-success-attack]]
[TIPO] Rule
[TAGS] Great_Success | Combat_Point
[DESCRIPCIÓN] Cuando se obtiene un super exito en una tirada donde un attaque es involucrado y este no esta definido de ninguna otra forma, ya sea en el ataque utilizado, en la reaccion que lo detono y la habilidad que se uso para realizarlo entonces se aplica esta regla general de super exito. Al cumplir con las condiciones de este super exito, obtienes 1 combat point

---

[[mitigacion]]
[TIPO] Rule
[TAGS]
[DESCRIPCIÓN] Cuando un personaje es alcanzado por un ataque trasn fallar la tirada de defensa o por no poder defenderse debido a la falta de estamina, el dañó total recibido puede ser mitigado, la principal mitigacion viene de la armadura pero hay otras fuentes y acciones que pueden alterar este valor tanto positiva como negativamente.

---

[[umbral-de-heridas]]
[TIPO] Rule
[TAGS]
[DESCRIPCIÓN] Cuando un personaje es alcanzado por un ataque trasn fallar la tirada de defensa o por no poder defenderse debido a la falta de estamina, si daño recibido tras las mitigaciones pertinentes iguala o supera 8 entonces el personaje puede no solo recibir el daño si no que tambien se le producira una herida, el personaje aun puede evitarlo pero debera hacer una prueba de endurance y conseguir un numero de exitos isuperior al daño recibido - 8, por ejemplo, si se recibe 10 puntos de daño se ocupan 3 exitos para evitar la herida

---

[[cunning]]
[TIPO] Skill
<<Stat>> Dexterity
[TAGS]
[DESCRIPCIÓN] Destreza manual para trampas/cerraduras. Habilidad con armas ligeras y herramientas complejas.

---

[[infiltration]]
[TIPO] Skill
<<Stat>> Dexterity
[TAGS]
[DESCRIPCIÓN] Movimiento silencioso y posicionamiento táctico. Bonus en emboscadas y maniobras de flanqueo.

---

[[precision]]
[TIPO] Skill
<<Stat>> Dexterity
[TAGS] Offensive_Skills
[DESCRIPCIÓN] Ataques quirúrgicos a puntos débiles. Aumenta crítica y efectividad con armas de proyectiles.

---

[[reflexes]]
[TIPO] Skill
<<Stat>> Dexterity
[TAGS] Defensive_Skills
[DESCRIPCIÓN] Esquivas instintivas y paradas rápidas. Mejora tiempo de reacción contra ataques sorpresa.

---

[[focus]]
[TIPO] Skill
<<Stat>> Mental
[TAGS] Offensive_Skills
[DESCRIPCIÓN] Ataques psíquicos y canalización mágica. Precisión con hechizos y armas de energía.

---

[[investigation]]
[TIPO] Skill
<<Stat>> Mental
[TAGS]
[DESCRIPCIÓN] Análisis rápido del campo de batalla. Detección de trampas y puntos estratégicos clave.

---

[[survive]]
[TIPO] Skill
<<Stat>> Mental
[TAGS]
[DESCRIPCIÓN] Conocimiento de entornos hostiles. Identificación de amenazas naturales y primeros auxilios.

---

[[willpower]]
[TIPO] Skill
<<Stat>> Mental
[TAGS] Defensive_Skills
[DESCRIPCIÓN] Defensa contra control mental. Resistencia a miedo, confusión y efectos sobrenaturales.

---

[[evoke]]
[TIPO] Skill
<<Stat>> Presence
[TAGS] Offensive_Skills
[DESCRIPCIÓN] Ataques místicos y canalización elemental. Manipulación de energías arcanas y fuerzas espirituales.

---

[[insight]]
[TIPO] Skill
<<Stat>> Presence
[TAGS]
[DESCRIPCIÓN] Lectura de intenciones enemigas. Predicción de movimientos y detección de debilidades ocultas.

---

[[instinct]]
[TIPO] Skill
<<Stat>> Presence
[TAGS]
[DESCRIPCIÓN] Intuición de combate mejorada. Bonus en reacciones defensivas y oportunidades de contraataque.

---

[[resilence]]
[TIPO] Skill
<<Stat>> Presence
[TAGS] Defensive_Skills
[DESCRIPCIÓN] Defensa contra drenajes de energía. Protección de reservas mágicas y reducción de costos de habilidades.

---

[[athletics]]
[TIPO] Skill
<<Stat>> Strenght
[TAGS]
[DESCRIPCIÓN] Hazañas de fuerza física. Saltos, escalada, y uso de armas de dos manos con eficiencia.

---

[[fortitude]]
[TIPO] Skill
<<Stat>> Strenght
[TAGS] Defensive_Skills
[DESCRIPCIÓN] Resistencia al daño físico. Reduce impacto de golpes y permite soportar lesiones graves.

---

[[might]]
[TIPO] Skill
<<Stat>> Strenght
[TAGS] Ofensive_Skills
[DESCRIPCIÓN] Ataques brutales con armas pesadas. Daño físico puro y rompimiento de defensas.

---

[[resistance]]
[TIPO] Skill
<<Stat>> Strenght
[TAGS]
[DESCRIPCIÓN] Tolerancia a venenos/toxinas. Mitiga efectos debilitantes y acelera recuperación de estados alterados.

---

[[dexterity]]
[TIPO] Stat
[TAGS]
[DESCRIPCIÓN] Agilidad y coordinación corporal. Clave para movimientos precisos, ataques rápidos y maniobras ágiles

---

[[endurance]]
[TIPO] Stat
[TAGS] Wounds
[DESCRIPCIÓN] Tu resistencia física para soportar el castigo del combate. Determina tu reserva de vida y capacidad para recuperarte de heridas críticas.

---

[[mental]]
[TIPO] Stat
[TAGS]
[DESCRIPCIÓN] Enfoque y disciplina psicológica. Vital para mantener la concentración bajo presión y resistir efectos mentales.

---

[[presence]]
[TIPO] Stat
[TAGS]
[DESCRIPCIÓN] Carisma y fuerza espiritual. Potencia habilidades místicas y capacidad para influir en el campo de batalla.

---

[[stamina]]
[TIPO] Stat
[TAGS]
[DESCRIPCIÓN] El combustible de tus acciones en batalla. Gobierna tu capacidad para ejecutar habilidades especiales y recuperarte entre asaltos.

---

[[strength]]
[TIPO] Stat
[TAGS]
[DESCRIPCIÓN] Poder bruto y capacidad física. Fundamental para ataques directos y acciones que requieren fuerza muscular.

---

[[adventage]]
[TIPO] Rule
[TAGS] Dice_Bonuses
[DESCRIPCIÓN] La ventaja sea usa como sinonimo de un doble dado de bonus, cuando una accion, habilidad o prueba te dice que tienes ventaja tienes que agregar dos dados de bonus a tu tirada

---

[[bonus-dice]]
[TIPO] Rule
[TAGS]
[DESCRIPCIÓN] Los dados de bonus son dados adicionales que se agregan a una tirada de dados.

---

[[combat-points]]
[TIPO] Rule
[TAGS] Great_Success | Damage | Armor
[DESCRIPCIÓN] Los puntos de combate son una estadistica que un personaje obtiene durante una mision/campaña/sessionde juego por diferentes medios, estos puntos estan limitidas a un maximo de 5 y se pueden gastar en diferentes modificaciones. - En una tirada de dados cambiar un 4 por 5 para lograr un exito adicional que asegure el poder llevar acabo una accion determinada. No se puede usar este cambio para obtener un super exito - En el calculo del daño de tu ataque agregar dos puntos de daño adicional - En el calculo de dañó tras recibir un ataque enemigo agregar 3 puntos adicionales a tu mitigacion

---

[[disvantage]]
[TIPO] Rule
[TAGS] Dice_Penalties
[DESCRIPCIÓN] La desventaja sea usa como sinonimo de un doble dado de penalizacion, cuando una accion, habilidad o prueba te dice que tienes desventaja tienes que agregar dos dados de penalizacion a tu tirada

---

[[penalty-dice]]
[TIPO] Rule
[TAGS] Reroll
[DESCRIPCIÓN] Los dados de penalizacion son dados adicionales que se agregan a una tirada de dados pero con las particularidad de que si uno de estos dados cae en 5 o 6 entonces resta exitos en lugar de sumar, los dados de penalizacion siempre siguen la regla del reroll por lo que un simple dado de penalizacion puede restar varios exitos.

---

[[reroll]]
[TIPO] Rule
[TAGS]
[DESCRIPCIÓN] El reroll aplica en la tiradas de dados con aquellos que resultan ser un 6 natural, puediendo volver a lanzar el dado y seguir acumulando exitos.

---

[[super-exito]]
[TIPO] Rule
[TAGS]
[DESCRIPCIÓN] Una tirada de dados es considerada como super exitosa cuado el numero de exitos conseguidos supera por 3 o mas a su contraparte, usualmente se obtienen beneficios adicionales al exito convencional de haber superado una prueba determinada, muchas acciones y habilidad tienen definido su propio super exitos algunas otras que no lo tienen usan los superexitos definidos segun la naturaleza de la accion/habilidad

---

[[Validar_con_gm]]
[TIPO] Rule
[TAGS]
[DESCRIPCIÓN] Algunas acciones pueden requerir que primero preguntes a tu dungeon master si las puedes lleevar acabo, platicale lo que quieres lograr y te proporcionara la hbilidad que deberas usar y los exitos que debes superar para llevar acabo tu idea

---

[/CATEGORÍA]
