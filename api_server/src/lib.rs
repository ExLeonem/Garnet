#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate diesel;
pub mod routes;
pub mod models;
pub mod csv_reader;
pub mod schema;
pub mod db;

// Alle db zugriffe ausgelagert in db.rs
// Hier nur API Aufruf als Einstiegspunkt.

pub fn start_api() {
    //read_csv();
    rocket::ignite()
    .register(catchers![routes::not_found])
    .mount("/", routes![routes::index, routes::get_all_trashcans,
    routes::trashcan, routes::add_trashcan, routes::get_all_districts, routes::fill_trashcan, routes::get_optimal_path, routes::update_trashcan])
    .launch();
}

pub fn read_csv() {
    let csv = csv_reader::run();

    match csv {
        Ok(trashtypes_and_trashcans) => {
            let trashtypes = trashtypes_and_trashcans.0;
            let trashcans = trashtypes_and_trashcans.1;
            for trashtype in trashtypes {
                db::insert_trashtype(trashtype);
            }
            for trashcan in trashcans {
                db::insert_trashcan(trashcan);
            }
        }
        Err(err) => println!("{:?}", err),
    }
}