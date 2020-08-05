interface IDamageTextPool extends Phaser.GameObjects.Group {
  spawn(x: number, y: number, damage: number): Phaser.GameObjects.Text;
  despawn(DamageTextPool: Phaser.GameObjects.Text);
}

export { IDamageTextPool };
/*
declare global so interfaces do not have to be imported to use
ERR: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations(2669)
FIX: mark the file as a module with "export {};"
*/
