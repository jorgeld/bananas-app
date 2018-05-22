"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var equipos_service_1 = require(".//equipos.service");
var jugadores_service_1 = require("../jugadores/jugadores.service");
var utils_service_1 = require("../utils/utils.service");
var Rx_1 = require("rxjs/Rx");
var EquiposComponent = (function () {
    function EquiposComponent(_equiposService, _jugadoresService, _utilsService, _appComponent) {
        var _this = this;
        this._equiposService = _equiposService;
        this._jugadoresService = _jugadoresService;
        this._utilsService = _utilsService;
        this._appComponent = _appComponent;
        this.listadoequipos = [];
        this.listadojugadores = [];
        this.listadojugadoresSeleccionables = [];
        this.listadoEquiposSeleccionables = [];
        this.comunidades = ['Andalucía', 'Aragón', 'Canarias', 'Cantabria', 'Castilla y León', 'Castilla-La Mancha', 'Cataluña', 'Ceuta', 'Comunidad Valenciana', 'Comunidad de Madrid', 'Extremadura', 'Galicia', 'Islas Baleares', 'La Rioja', 'Melilla', 'Navarra', 'País Vasco', 'Principado de Asturias', 'Región de Murcia', 'Andorra'];
        this.rondaDraft = 0;
        this.loadData = function () {
            //Eliminamos datos pendientes
            _this.borrarDatos();
            // Recogemos la ronda del draf correspondiente
            _this.rondaDraft = Number((localStorage.getItem('rondaDraft')));
            _this._equiposService.getEquiposRest()
                .subscribe(function (result) {
                _this.listadoequipos = result.equipos;
                _this.listadoequipos.sort();
                //Vemos los equipos que pueden seleccionar jugadores
                _this.listadoEquiposSeleccionables = _this.listadoequipos.filter(function (equipo) { return !equipo.jugadores || equipo.jugadores.length < _this.rondaDraft; });
                _this.listadoEquiposSeleccionables.sort();
                //Recogemos el equipo al cual le toca seleccionar jugador
                _this._equiposService.getEquipo(_this.listadoEquiposSeleccionables[_this.listadoEquiposSeleccionables.length - 1]._id)
                    .subscribe(function (result) {
                    _this.equipoSelector = result.equipo;
                    _this._jugadoresService.getJugadoresRest()
                        .subscribe(function (result) {
                        _this.listadojugadores = result.jugadores;
                        _this.listadojugadoresSeleccionables = _this.listadojugadores.filter(function (jugador) { return !jugador.team || jugador.team == ''; });
                    }, function (error) { console.log('Error al generar listado de jugadores'); });
                }, function (error) {
                    console.log('Error al captura equipo');
                });
            }, function (error) {
                console.log("Error al llamar servicio getEquipos()");
            });
        };
        this.seleccionarJugador = function (jugador) {
            var _this = this;
            var _equipo = this.equipoSelector;
            this._equiposService.getEquipo(_equipo._id)
                .subscribe(function (result) {
                _equipo = result.equipo;
                _this._jugadoresService.getJugador(jugador._id)
                    .subscribe(function (result) {
                    var _jugador = result.jugador;
                    var body = { jugadores: _equipo.jugadores };
                    body.jugadores.push(_jugador);
                    _this._equiposService.updateEquipo(_equipo._id, body)
                        .subscribe(function (result) {
                        var body = { team: _equipo.name };
                        _this._jugadoresService.updateJugador(_jugador._id, body)
                            .subscribe(function (result) {
                            if (_this.listadoequipos.filter(function (equipo) { return equipo.jugadores.length == _this.rondaDraft; }).length == _this.listadoequipos.length - 1) {
                                _this.rondaDraft++;
                                localStorage.setItem('rondaDraft', _this.rondaDraft.toString());
                            }
                            _this.loadData();
                        }, function (error) { console.log("Error al actualizar jugador"); });
                    }, function (error) { console.log("Error al actualizar equipo"); });
                }, function (error) { console.log("Error al recoger jugador seleccionado"); });
            }, function (error) { console.log("Error al recoger equipo seleccionado"); });
        };
        this.generateEquipos = function () {
            var _this = this;
            var observables = [];
            this.generandoEquipos = true;
            this.comunidades.forEach(function (comunidad) {
                var body = { 'name': comunidad };
                observables.push(_this._equiposService.newEquipo(body));
            });
            Rx_1.Observable.forkJoin(observables)
                .subscribe(function (result) { localStorage.setItem('rondaDraft', '1'); }, function (error) { console.log("Error al llamar servicio newEquipo()"); }, function () {
                _this.generandoEquipos = false;
                // this.borrarDatos();
                _this.loadData();
            });
        };
        this.eliminarEquipos = function () {
            var _this = this;
            var observables = [];
            this.eliminandoEquipos = true;
            this.listadoequipos.forEach(function (equipo) {
                observables.push(_this._equiposService.deleteEquipo(equipo._id));
            });
            Rx_1.Observable.forkJoin(observables)
                .subscribe(function (result) { }, function () { return console.log('error'); }, function () {
                localStorage.removeItem('rondaDraft');
                _this.eliminandoEquipos = false;
                _this.loadData();
            });
        };
        this.vaciarEquipos = function () {
            var _this = this;
            var observables = [];
            var equipos = [];
            this.vaciarJugadoresEquipo = true;
            this.listadoequipos.forEach(function (equipo) {
                var body = { jugadores: [] };
                observables.push(_this._equiposService.updateEquipo(equipo._id, body));
            });
            Rx_1.Observable.forkJoin(observables)
                .subscribe(function (result) { }, function () { return console.log('error'); }, function () {
                _this.vaciarJugadoresEquipo = false;
                _this.loadData();
            });
        };
        this.borrarDatos = function () {
            this.listadoequipos = [];
            this.listadojugadores = [];
            this.listadojugadoresSeleccionables = [];
            this.listadoEquiposSeleccionables = [];
            this.equipoSelector = {};
        };
    }
    EquiposComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    return EquiposComponent;
}());
EquiposComponent = __decorate([
    core_1.Component({
        selector: 'app-equipos',
        templateUrl: './equipos.component.html',
        styleUrls: ['./equipos.component.css'],
        providers: [equipos_service_1.EquiposService, jugadores_service_1.JugadoresService, utils_service_1.UtilsService]
    })
], EquiposComponent);
exports.EquiposComponent = EquiposComponent;
