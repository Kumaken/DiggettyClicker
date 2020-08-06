interface IDamageTextPool extends Phaser.GameObjects.Group {
  spawn(x: number, y: number, damage: number): Phaser.GameObjects.DOMElement;
  despawn(DamageTextPool: Phaser.GameObjects.DOMElement);
}

export { IDamageTextPool };
/*
declare global so interfaces do not have to be imported to use
ERR: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations(2669)
FIX: mark the file as a module with "export {};"
*/
