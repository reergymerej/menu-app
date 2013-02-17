class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.integer :date

      t.timestamps
    end
  end
end
