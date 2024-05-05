import { Migration } from '@mikro-orm/migrations';

export class Migration20240505010842 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "product" ("id" uuid not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" float not null, constraint "product_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" uuid not null, "password" varchar(255) not null, "email" varchar(255) not null, "role" varchar(255) not null, constraint "user_pkey" primary key ("id"));');

    this.addSql('create table "order" ("id" uuid not null, "user_id" uuid not null, "cart_id" varchar(255) not null, "payment" varchar(255) null, "delivery" varchar(255) null, "comments" varchar(255) not null default \'\', "status" varchar(255) not null default \'created\', "total" int not null, constraint "order_pkey" primary key ("id"));');

    this.addSql('create table "order_item" ("order_id" uuid not null, "id" uuid not null, "title" varchar(255) not null, "description" varchar(255) not null, "price" float not null, "count" int not null, constraint "order_item_pkey" primary key ("order_id"));');

    this.addSql('create table "cart" ("id" uuid not null, "user_id" uuid not null, "is_deleted" boolean not null, constraint "cart_pkey" primary key ("id"));');

    this.addSql('create table "cart_item" ("cart_id" uuid not null, "product_id" uuid not null, "count" int not null, constraint "cart_item_pkey" primary key ("cart_id", "product_id"));');

    this.addSql('alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "order_item" add constraint "order_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;');
    this.addSql('alter table "cart_item" add constraint "cart_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;');
  }

}
