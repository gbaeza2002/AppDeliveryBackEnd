use delivery_app;

-- USERS
create table users(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(90) NOT NULL,
    lastname VARCHAR(90) NOT NULL,
    phone VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    password VARCHAR(90) NOT NULL,
    created_at timestamp(0),
    updated_at timestamp(0)
);

-- ROLES
create table roles(
	id bigint primary key auto_increment,
    name varchar(90) not null unique,
    image varchar(255) null,
    route varchar(180) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

insert into roles(
	name,
    route,
    created_at,
    updated_at
) values(
	'RESTAURANTE',
    '/restaurant/orders/list',
    '2025-03-13',
    '2025-03-13'
);

insert into roles(
	name,
    route,
    created_at,
    updated_at
) values(
	'REPARTIDOR',
    '/delivery/orders/list',
    '2025-03-13',
    '2025-03-13'
);

insert into roles(
	name,
    route,
    created_at,
    updated_at
) values(
	'CLIENTE',
    '/client/orders/list',
    '2025-03-13',
    '2025-03-13'
);

insert into roles(
	name,
    route,
    created_at,
    updated_at
) values(
	'ADMIN',
    '/admin/orders/list',
    '2025-03-13',
    '2025-03-13'
);

insert into roles(
	name,
    route,
    created_at,
    updated_at
) values(
	'COCINA',
    '/cocina/orders/list',
    '2025-03-13',
    '2025-03-13'
);

insert into roles(
	name,
    route,
    created_at,
    updated_at
) values(
	'GARZON',
    '/garzon/orders/list',
    '2025-03-13',
    '2025-03-13'
);

create table user_has_roles(
	id_user bigint not null,
    id_rol bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key(id_user) references users(id) on update cascade on delete cascade,
    foreign key(id_rol) references roles(id) on update cascade on delete cascade,
    primary key(id_user, id_rol)
);

-- CATEGORIES
create table categories(
	id bigint primary key auto_increment,
    name varchar(50) not null,
    description text not null,
    image varchar(255) null,
    created_at timestamp(0) not null,
	updated_at timestamp(0) not null
);

-- PRODUCTS
create table products(
	id bigint primary key auto_increment,
    name varchar(180) not null,
    description text not null,
    price decimal not null,
    image1 varchar(255)  null,
    image2 varchar(255)  null,
    image3 varchar(255)  null,
    id_category bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key(id_category) references categories(id) on update cascade on delete cascade
);

-- ORDERS
create table  address(
	id bigint primary key auto_increment,
    address varchar(255) not null,
    neighborhood varchar(180) not null,
    lat double not null,
    lng double not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    id_user bigint not null,
    foreign key (id_user) references users(id) on update cascade on delete cascade
);

create  table orders(
	id bigint primary key auto_increment,
    id_client bigint not null,
    id_delivery bigint null,
    id_address bigint not null,
    lat double precision,
    lng double precision,
    status varchar(90) not null,
    timestamp bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    foreign key(id_client) references users(id) on update cascade on delete cascade,
	foreign key(id_delivery) references users(id) on update cascade on delete cascade,
	foreign key(id_address) references address(id) on update cascade on delete cascade
);

create  table orders_resturant(
	id bigint primary key auto_increment,
	number_mesa bigint not null,
    status varchar(90) not null,
    timestamp bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

create table orders_has_products(
	id_order bigint not null,
    id_product bigint not null,
    quantity bigint not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    primary key(id_order, id_product),
    foreign key(id_order) references orders(id) on update cascade on delete cascade,
    foreign key(id_product) references products(id) on update cascade on delete cascade
);

CREATE TABLE IF NOT EXISTS orders_resturant_has_products (
    id_order BIGINT NOT NULL,
    id_product BIGINT NOT NULL,
    quantity BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    updated_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
    PRIMARY KEY (id_order, id_product),
    FOREIGN KEY (id_order) REFERENCES orders_resturant(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);
