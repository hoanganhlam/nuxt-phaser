import Phaser from 'phaser';

/**
 * PrefabGroup Group
 * @class PrefabGroup
 * @extends {Phaser.Physics.Arcade.Group}
 */
class PrefabGroup extends Phaser.GameObjects.Group {
  /**
   * Creates an instance of HorizonItems
   * @param {Phaser.Scene} scene - The Scene to which this HorizonItems group belongs
   */
  constructor(scene) {
    super(scene, []);
  }

  /**
   * Update horizon items group
   */
  update() {
    this.children.each(item => {
      item.update()
    })
  }

  /**
   * Spawn horizon item
   * @abstract
   */
  spawnItem() {
    throw new Error('Method must be implemented by subclass');
  }

  /**
   * Clear horizon items group
   */
  clearItems() {
    this.children.each(item => {
      item.die();
    });
  }

  /**
   * Reset horizon items group
   */
  reset() {
    this.children.each(item => item.reset());
    this.clear(true, true);
  }
}

export default PrefabGroup;
