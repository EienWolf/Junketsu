// weapon-form.component.ts
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Weapon, Attack, Durability_Type, Ability, Attack_Range, Grip_Mode, Wield_Effect, Guard_Type } from '../../models/weapon.model';
import { WeaponService } from '../../services/weapon.service';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-weapon-form',
  templateUrl: './weapon-form.component.html',
  styleUrls: ['./weapon-form.component.css'],
  imports: [ReactiveFormsModule, CardModule, TextareaModule, SelectButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeaponFormComponent implements OnInit {
  @Input() weaponId?: string;
  weaponForm: FormGroup;
  enums = {
    Durability_Type: Object.values(Durability_Type),
    Ability: Object.values(Ability),
    Attack_Range: Object.values(Attack_Range),
    Grip_Mode: Object.values(Grip_Mode),
    Wield_Effect: Object.values(Wield_Effect)
  };

  constructor(private fb: FormBuilder, private weaponService: WeaponService) {
    this.weaponForm = this.createForm();
  }

  ngOnInit() {
    if (this.weaponId) {
      this.loadWeapon(this.weaponId);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      short_description: ['', Validators.maxLength(144)],
      description: [''],
      durability_type: [Durability_Type.Regular, Validators.required],
      durability: [null, [Validators.min(0), Validators.max(10)]],
      is_throwable: [false],
      is_block: [false],
      is_agile: [false],
      base_damage: [1, [Validators.required, Validators.min(1)]],
      ability: [Ability.MIGHT, Validators.required],
      attack_range: [Attack_Range.MELEE, Validators.required],
      reach_range: [null, [Validators.min(5), Validators.pattern(/^[0-9]*$/)]],
      grip_mode: [Grip_Mode.ONE_HAND, Validators.required],
      wield_effect: [Wield_Effect.VERSATILE],
      ammo_capacity: [null, Validators.min(0)],
      reloadrate: [null, Validators.min(0)],
      image: ['', Validators.pattern(/\.(jpeg|jpg|gif|png)$/)],
      attacks: this.fb.array([])
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
      is_secondary: [attack?.is_secondary || false]
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
    weapon.attacks.forEach(attack => this.attacks.push(this.createAttack(attack)));
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
}