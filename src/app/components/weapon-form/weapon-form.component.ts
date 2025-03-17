// weapon-form.component.ts
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Weapon,
  Attack,
  Durability_Type,
  Ability,
  Attack_Range,
  Grip_Mode,
  Wield_Effect,
  Guard_Type,
} from '../../models/weapon.model';
import { WeaponService } from '../../services/weapon.service';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FieldsetModule } from 'primeng/fieldset';
import { RatingModule } from 'primeng/rating';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-weapon-form',
  templateUrl: './weapon-form.component.html',
  styleUrls: ['./weapon-form.component.css'],
  imports: [
    ReactiveFormsModule,
    CardModule,
    TextareaModule,
    SelectButtonModule,
    InputNumberModule,
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    FieldsetModule,
    RatingModule,
    MessageModule,
    CheckboxModule,
    ButtonModule,
    ToggleSwitchModule,
    TooltipModule,
    RadioButtonModule,
    SelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeaponFormComponent implements OnInit {
  @Input() weaponId?: string;
  weaponForm: FormGroup;
  enums = {
    AmmoTypes: ['Standard', 'Shells', 'Rifle', 'Cannon', 'Special'],
    Durability_Type: Object.values(Durability_Type).reverse(),
    Ability: [Ability.MIGHT, Ability.PRECISION, Ability.FOCUS, Ability.EVOKE],
    Attack_Range_M: [
      {
        label: Attack_Range.MELEE,
        tooltip: 'Ataque cuerpo a cuerpo de 1 casilla.',
      },
      {
        label: Attack_Range.REACH,
        tooltip: 'Puede alcanzar 2 casillas cuerpo a cuerpo.',
      },
    ],
    Attack_Range_R: [
      {
        label: Attack_Range.SHORT,
        tooltip: 'Rango de distancia hasta 6 casillas.',
      },
      {
        label: Attack_Range.MEDIUM,
        tooltip: 'Rango efectivo de 6 a 12 casillas.',
      },
      {
        label: Attack_Range.LARGE,
        tooltip: 'Rango efectivo de 12 casillas en adelante.',
      },
    ],
    Grip_Mode: [
      {
        label: Grip_Mode.ONE_HAND,
        tooltip:
          'Se necesita Mínimo una Mano para maniobrar el arma, a una mano  se puede agregar un penalizador al ataque.',
      },
      {
        label: Grip_Mode.TWO_HAND,
        tooltip:
          'Se necesita Ambas manos para poder maniobrar el arma como se pretende, a una mano se tiene -2 éxitos.',
      },
      {
        label: Grip_Mode.TWO_HAND_REQUIRED,
        tooltip:
          'Se requiere 2 manos para manipular la herramienta, cada mano tiene una acción en concreto(Arco)(Ametralladora), Si las manos no son del mismo usuario se tiene penalizador.',
      },
    ],
    Wield_Effect: [
      {
        label: Wield_Effect.LIGHT,
        tooltip: 'A dos manos no se agrega modificador de daño.',
      },
      {
        label: Wield_Effect.VERSATILE,
        tooltip:
          'A dos manos se agrega modificador de Daño extra, a una mano no.',
      },
      {
        label: Wield_Effect.HEAVY,
        tooltip: 'Menos daño cuando se porta a una 1 mano.',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private weaponService: WeaponService,
  ) {
    this.weaponForm = this.createForm();

    this.weaponForm.get('durability_type')!.valueChanges.subscribe((value) => {
      // Lógica para cambiar campo2 en función de campo1

      let durability = 0;
      switch (value) {
        case Durability_Type.Legacy:
          durability = 10;
          break;
        case Durability_Type.Regular:
          durability = 5;
          break;
        case Durability_Type.Scrap:
          durability = 3;
          break;
      }
      this.weaponForm.get('durability')!.setValue(durability);
    });
  }

  verifyFinesse() {
    const finesse = this.weaponForm.get('is_finnese')!; // 0 1 2
    const control = this.weaponForm.controls['ability']; //might precision evoke focus

    if (
      (control.value == Ability.EVOKE || control.value == Ability.FOCUS) &&
      finesse.value == 1
    ) {
      finesse.setValue(0);
    } else if (
      (control.value == Ability.MIGHT || control.value == Ability.PRECISION) &&
      finesse.value == 2
    ) {
      finesse.setValue(0);
    }
  }

  disableToogles($event: any) {
    // Reiniciar todas las opciones a no restringidas
    const control = this.weaponForm.controls['ability'];
    const value = control.value.label;
    console.log('control: ', value);
    // Deshabilitar opciones basadas en el valor de $event
    if ($event === 1 && (value == Ability.FOCUS || value == Ability.EVOKE)) {
      control.setValue(undefined);
    } else if (
      $event === 2 &&
      (value == Ability.MIGHT || value == Ability.PRECISION)
    ) {
      control.setValue(undefined);
    }
  }

  ngOnInit() {
    if (this.weaponId) {
      this.loadWeapon(this.weaponId);
    }
  }

  onRangeChange(event: any, type: 'melee' | 'ranged') {
    const selectedValue = event.value;
    this.weaponForm.get('attack_range')!.setValue(selectedValue); // Actualizar el valor del control
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      short_description: ['', Validators.maxLength(144)],
      description: [''],
      durability_type: [Durability_Type.Regular, Validators.required],
      durability: [5, [Validators.min(0), Validators.max(10)]],
      is_throwable: [false],
      is_block: [false],
      is_agile: [false],
      base_damage: [1, [Validators.required, Validators.min(1)]],
      ability: [Ability.MIGHT, Validators.required],
      attack_range: [Attack_Range.MELEE, Validators.required],
      reach_range: [null, [Validators.min(5), Validators.pattern(/^[0-9]*$/)]],
      grip_mode: [Grip_Mode.ONE_HAND, Validators.required],
      wield_effect: [Wield_Effect.VERSATILE],
      //Ammounition
      use_ammo: [false],
      ammo_capacity: [0, Validators.min(0)],
      reloadrate: [0, Validators.min(0)],

      image: ['', Validators.pattern(/\.(jpeg|jpg|gif|png)$/)],
      attacks: this.fb.array([]),
      is_finnese: [0],
      is_arcana: [false],
      ammoType: [0],
    });
  }

  get attacks(): FormArray {
    return this.weaponForm.get('attacks') as FormArray;
  }

  createAttack(attack?: Attack): FormGroup {
    return this.fb.group({
      attack_name: [attack?.attack_name || '', Validators.required],
      stamina: [attack?.stamina || 1, [Validators.required, Validators.min(1)]],
      damage_type: [attack?.damage_type || ''],
      damage_formula: [attack?.damage_formula || '', Validators.required],
      ability: [attack?.ability || Ability.MIGHT],
      description: [attack?.description || ''],
      critical_success: [attack?.critical_success || ''],
      is_basic: [attack?.is_basic || false],
      is_secondary: [attack?.is_secondary || false],
    });
  }

  addAttack() {
    this.attacks.push(this.createAttack());
  }

  removeAttack(index: number) {
    this.attacks.removeAt(index);
  }

  loadWeapon(id: string) {
    let weapon = this.weaponService.getWeapon(id);
    this.weaponForm.patchValue(weapon);
    weapon.attacks.forEach((attack) =>
      this.attacks.push(this.createAttack(attack)),
    );
  }

  onSubmit() {
    if (this.weaponForm.valid) {
      const weaponData: Weapon = this.weaponForm.value;
      if (this.weaponId) {
        this.weaponService.updateWeapon(weaponData);
      } else {
        this.weaponService.addWeapon(weaponData);
      }
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  getDescription(attribute: string) {
    switch (attribute) {
      case Ability.MIGHT:
        return 'Atributo ideal para armas de gran poder destructivo, como hachas de batalla o martillos. Aumenta el daño bruto y la capacidad de romper defensas.';

      case Ability.PRECISION:
        return 'Atributo clave para armas ágiles y letales, como dagas o arcos. Mejora la precisión, los golpes críticos y la efectividad en ataques rápidos.';

      case Ability.FOCUS:
        return 'Atributo para armas que requieren concentración y control, como varitas o bastones mágicos. Potencia habilidades mágicas y efectos especiales.';

      case Ability.EVOKE:
        return 'Atributo para armas carismáticas o inspiradoras, como espadas luminosas o instrumentos. Aumenta habilidades de apoyo, influencia y efectos de área.';
    }

    return '';
  }
}
