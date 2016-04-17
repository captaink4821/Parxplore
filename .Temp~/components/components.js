/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

	var _import = __webpack_require__(1);

	var mod0 = _interopRequireWildcard(_import);

	var _import2 = __webpack_require__(2);

	var mod1 = _interopRequireWildcard(_import2);

	var _import3 = __webpack_require__(6);

	var mod2 = _interopRequireWildcard(_import3);

	var _import4 = __webpack_require__(3);

	var mod3 = _interopRequireWildcard(_import4);

	var _import5 = __webpack_require__(7);

	var mod4 = _interopRequireWildcard(_import5);

	var _import6 = __webpack_require__(4);

	var mod5 = _interopRequireWildcard(_import6);

	var _import7 = __webpack_require__(5);

	var mod6 = _interopRequireWildcard(_import7);

	var _import8 = __webpack_require__(15);

	var mod7 = _interopRequireWildcard(_import8);

	var _import9 = __webpack_require__(16);

	var mod8 = _interopRequireWildcard(_import9);

	var _import10 = __webpack_require__(8);

	var mod9 = _interopRequireWildcard(_import10);

	var _import11 = __webpack_require__(9);

	var mod10 = _interopRequireWildcard(_import11);

	var _import12 = __webpack_require__(10);

	var mod11 = _interopRequireWildcard(_import12);

	var _import13 = __webpack_require__(11);

	var mod12 = _interopRequireWildcard(_import13);

	var _import14 = __webpack_require__(12);

	var mod13 = _interopRequireWildcard(_import14);

	var _import15 = __webpack_require__(13);

	var mod14 = _interopRequireWildcard(_import15);

	var _import16 = __webpack_require__(14);

	var mod15 = _interopRequireWildcard(_import16);

	wrm.defineModule("wrm/comp/DetailsService", mod0);

	wrm.defineModule("wrm/comp/MessageService", mod1);

	wrm.defineModule("wrm/comp/MapService", mod2);

	wrm.defineModule("wrm/comp/ListService", mod3);

	wrm.defineModule("wrm/comp/SelectorService", mod4);

	wrm.defineModule("wrm/comp/FormService", mod5);

	wrm.defineModule("wrm/comp/ViewComponentService", mod6);

	wrm.defineModule("wrm/comp/val/EMailValidationRuleService", mod7);

	wrm.defineModule("wrm/comp/val/MandatoryValidationRuleService", mod8);

	wrm.defineModule("wrm/comp/CreateService", mod9);

	wrm.defineModule("wrm/comp/UpdateService", mod10);

	wrm.defineModule("wrm/comp/SwitchService", mod11);

	wrm.defineModule("wrm/comp/RestfulRequestResponseService", mod12);

	wrm.defineModule("wrm/comp/DeleteService", mod13);

	wrm.defineModule("wrm/comp/LoginService", mod14);

	wrm.defineModule("wrm/comp/LogoutService", mod15);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Details view components.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractCachedViewComponentService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractCachedViewComponentService, {

	    /** @override */
	    initialize: function (descr) {
	        var thisService = this;

	        /**
	         * @private
	         * @type {!string}
	         */
	        this._entityId = descr["entity"];

	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._output; // init'd below

	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._toBind; // init'd below

	        // TODO cache query instead
	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._condExpr; // init'd below

	        /**
	         * @private
	         * @type {!wrm.data.DataService}
	         */
	        this._dataService; // init'd below

	        return this.getManager().getDataService().then(function (dataService) {
	            thisService._dataService = dataService;
	            thisService._condExpr = descr["condExprs"];
	            var output = descr["output"];
	            thisService._output = {};
	            thisService._toBind = {};
	            if (output.length !== 0) {
	                output.forEach(function (column) {
	                    thisService._output[column["viewName"]] = column["ref"];
	                    thisService._toBind[column["viewName"]] = column["bindName"];
	                });
	            }
	        });
	    },

	    /** @override */
	    createResult: function (context) {
	        var thisService = this;
	        var input = context.getInput();

	        var resultsPromise = this._dataService.execute(function (d) {
	            var options = {
	                output: thisService._output,
	                outputConfig: { useNames: true },
	                filter: thisService._condExpr
	            };
	            return d.selectOne(thisService._entityId, options, input);
	        });

	        return resultsPromise.then(function (row) {
	            return {
	                "data": row
	            };
	        }, function (e) {
	            thisService.getLog().error(e);
	        });
	    },

	    /** @override */
	    computeOutputFromResult: function (context, result) {
	        return this._createOutput(result["data"]);
	    },

	    /** @override */
	    submitView: function (context) {
	        return this._createOutput(context.getView()["data"]);
	    },

	    /**
	     * @private
	     * @param {!Object} data
	     * @returns {!Object}
	     */
	    _createOutput: function (data) {
	        var output = {};
	        if (data === null) {
	            output["dataSize"] = 0;
	        } else {
	            var toBind = this._toBind;
	            var outputData = {};
	            Object.keys(this._output).forEach(function (key) {
	                outputData[toBind[key]] = data[key];
	            });
	            output["data"] = outputData;
	            output["dataSize"] = 1;
	        }
	        return output;
	    } });
	module.exports = exports.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Message view components.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractCachedViewComponentService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractCachedViewComponentService, {

	    /** @override */
	    initialize: function (descr) {

	        /**
	         * @private
	         * @type {?string}
	         */
	        this._defaultMessage = descr["defaultMessage"] || null;

	        /**
	         * @private
	         * @type {?Array}
	         */
	        this._placeholders = descr["placeholders"];
	    },

	    /** @override */
	    createResult: function (context) {
	        var input = context.getInput();

	        /* Get messages from input, or use the default one */
	        var messages = input["messages"];
	        if (messages === undefined) {
	            messages = this._defaultMessage;
	        }

	        /* Get placeholders values and replace in messages */
	        var placeholder = {};
	        for (placeholder in this._placeholders) {
	            var value = "";
	            placeholder = this._placeholders[placeholder];
	            if (input[placeholder["name"]] !== undefined) {
	                value = input[placeholder["name"]];
	            }
	            var exp = new RegExp("\\$\\$" + placeholder["label"] + "\\$\\$", "g");
	            if (angular.isArray(messages)) {
	                var message = null;
	                for (message in messages) {
	                    messages[message] = messages[message].replace(exp, value);
	                }
	            } else {
	                messages = messages.replace(exp, value);
	            }
	        }

	        return {
	            "messages": wrm.data.toStringArray(messages)
	        };
	    } });
	module.exports = exports.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for List view components.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractCachedViewComponentService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractCachedViewComponentService, {

	    /** @override */
	    initialize: function (descr) {
	        var thisService = this;

	        /**
	         * @private
	         * @type {!wrm.data.meta.Entity}
	         */
	        this._entity; // init'd below

	        // TODO cache query instead
	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._condExpr; // init'd below

	        /**
	         * @private
	         * @type {!boolean}
	         */
	        this._checkable = descr["checkable"] || false;

	        /**
	         * @private
	         * @type {boolean}
	         */
	        this._hasPreCondExpr = descr["preCondExprs"] !== undefined ? true : false;

	        // TODO cache query instead
	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._preCondExpr; // init'd below

	        /**
	         * @private
	         * @type {!number}
	         */
	        this._maxResults = descr["maxResults"];

	        /**
	         * @private
	         * @type {!boolean}
	         */
	        this._distinct = descr["distinct"] || false;

	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._output; // init'd below

	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._toBind; // init'd below

	        /**
	         * @private
	         * @type {!Array}
	         */
	        this._order = descr["order"];

	        /**
	         * @private
	         * @type {!wrm.data.DataService}
	         */
	        this._dataService; // init'd below

	        return this.getManager().getDataService().then(function (dataService) {
	            thisService._dataService = dataService;
	            thisService._entity = dataService.getMetadata().getEntity(descr["entity"]);
	            thisService._condExpr = descr["condExprs"];
	            var keyAttr = thisService._entity.getKeyAttribute();
	            var output = descr["output"];
	            thisService._output = {};
	            thisService._toBind = {};
	            if (output.length !== 0) {
	                output.forEach(function (column) {
	                    thisService._output[column["viewName"]] = column["ref"];
	                    thisService._toBind[column["viewName"]] = column["bindName"];
	                });
	            }
	            thisService._output["__key"] = keyAttr.getId();

	            if (thisService._checkable) {
	                thisService._output[keyAttr.getName()] = keyAttr.getId();
	                thisService._toBind[keyAttr.getName()] = keyAttr.getId();
	                thisService._preCondExpr = descr["preCondExprs"];
	            }
	        });
	    },

	    /** @override */
	    createResult: function (context) {
	        var thisService = this;
	        var input = context.getInput();

	        var options = {
	            output: this._output,
	            outputConfig: { useNames: true },
	            distinct: this._distinct,
	            filter: this._condExpr,
	            order: this._order
	        };
	        var resultsLength = input["maxResults"] || thisService._maxResults;
	        if (resultsLength > 0) {
	            var limit = {
	                count: resultsLength
	            };
	            options["limit"] = limit;
	        }

	        var promises = [];

	        promises.push(this._retrieveData(input, options));
	        if (this._checkable) {
	            var keyAttributeId = this._entity.getKeyAttribute().getId();
	            if (!this._refreshCheckedObjects(context)) {
	                var checkedObj = [];
	                var checkedRows = context.getView()["checkedRows"];
	                Object.keys(checkedRows).forEach(function (rowKey) {
	                    if (checkedRows[rowKey]) {
	                        checkedObj.push(rowKey);
	                    }
	                });
	                promises.push(checkedObj);
	            } else if (this._hasPreCondExpr) {
	                var preCheckOptions = {
	                    output: keyAttributeId,
	                    outputConfig: { useNames: true },
	                    filter: this._preCondExpr
	                };
	                promises.push(this._retrieveData(input, preCheckOptions));
	            }
	        }

	        return Promise.all(promises).then(function (results) {
	            var dataRows = results[0];
	            var preChecked = results[1] || [];
	            var checkedRows = {};

	            dataRows.forEach(function (row) {
	                context.markForViewTracking(row, row["__key"]);
	            });
	            if (thisService._checkable) {
	                preChecked.forEach(function (objKey) {
	                    checkedRows[objKey] = true;
	                });
	            }

	            return {
	                "data": dataRows,
	                "checkedRows": checkedRows
	            };
	        }, function (e) {
	            thisService.getLog().error(e);
	        });
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @param {!Object=} options
	     * @return {!Promise.<Object>}
	     */
	    _retrieveData: function (input, options) {
	        var thisService = this;
	        return this._dataService.execute(function (d) {
	            return d.select(thisService._entity.getId(), options, input);
	        });
	    },

	    /** @override */
	    catchEvent: function (context, event) {
	        var rowIndex = event.getParameters()["position"];
	        var view = context.getView();
	        view["current"] = rowIndex;
	    },

	    /** @override */
	    computeOutputFromResult: function (context, result) {
	        return this._createOutput(result);
	    },

	    /** @override */
	    submitView: function (context) {
	        var view = context.getView();
	        return this._createOutput(view);
	    },

	    /**
	     * @param {!Object} view
	     * @return {!Object}
	     */
	    _createOutput: function (view) {
	        var output = {};
	        var data = view["data"];
	        var current = view["current"] || 0;
	        var dataSize = data.length;
	        if (dataSize > 0) {
	            if (current === dataSize) {
	                current--;
	            }
	            if (this._checkable) {
	                output["checkedKeys"] = [];
	                var checkedRows = view["checkedRows"];
	                Object.keys(checkedRows).forEach(function (row) {
	                    if (checkedRows[row] == true) {
	                        output["checkedKeys"].push(row);
	                    }
	                });
	            }

	            var toBind = this._toBind;
	            var currentRow = data[current];
	            var outputData = {};
	            Object.keys(this._output).forEach(function (key) {
	                outputData[toBind[key]] = currentRow[key];
	            });

	            output["data"] = outputData;
	        }
	        output["dataSize"] = dataSize;
	        return output;
	    },

	    /**
	     * @private
	     * @param {!wrm.core.ViewComponentContext} context
	     * @return {boolean}
	     */
	    _refreshCheckedObjects: function (context) {
	        var RefreshMode = wrm.core.RefreshMode;
	        var refreshMode = context.getFormRefreshMode();
	        if (refreshMode === RefreshMode.PRESERVE) {
	            return false;
	        } else {
	            return true;
	        }
	    } });
	module.exports = exports.default;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var RefreshMode = wrm.core.RefreshMode;

	/**
	 * Service for Form view components.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractViewComponentService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractViewComponentService, {

	    /** @override */
	    initialize: function (descr) {

	        /**
	         * @private
	         * @type {!Array.<Object>}
	         */
	        this._fields = descr["fields"];
	    },

	    /** @override */
	    computeOutput: function (context) {
	        var thisService = this;
	        var refreshMode = context.getFormRefreshMode();
	        var output = {};

	        var view = context.getView();

	        view["form"] = view["form"] || {};
	        view["options"] = view["options"] || {};
	        view["fields"] = view["fields"] || {};
	        view["sFields"] = view["sFields"] || {};

	        this._fields.forEach(function (field) {
	            var fieldId = field["id"];
	            var type = wrm.util.obj.getEnumName(wrm.data.Type, field["type"]);
	            switch (field["fieldType"]) {
	                case "Field":
	                    var simpleField = {};
	                    if (refreshMode === RefreshMode.PRESERVE) {
	                        simpleField = view["form"][fieldId];
	                    } else {
	                        simpleField = thisService._computeFieldValue(context, field, refreshMode, wrm.data.Type[type]);
	                    }
	                    view["fields"][fieldId] = simpleField;
	                    output[fieldId] = simpleField;
	                    break;
	                case "SelectionField":
	                    var sField = {};
	                    var sFieldLabels = [];
	                    var sFieldOutputs = [];
	                    var options = [];
	                    var preselection;
	                    if (refreshMode === RefreshMode.PRESERVE) {
	                        sFieldLabels = view["sFields"][fieldId][Tags.LABEL.SUFFIX];
	                        sFieldOutputs = view["sFields"][fieldId][Tags.OUTPUT.SUFFIX];
	                        options = view["options"][fieldId];
	                        preselection = view["form"][fieldId] ? view["form"][fieldId]["value"] : "";
	                    } else {
	                        var hasFreshOptionsInputs = thisService._hasFreshOptionsInputs(context, field);
	                        sFieldLabels = thisService._computeSelectionFieldLabels(context, field, refreshMode, hasFreshOptionsInputs);
	                        sFieldOutputs = thisService._computeSelectionFieldOutputs(context, field, refreshMode, hasFreshOptionsInputs);
	                        options = thisService._computeSelectionFieldOptions(context, field, refreshMode, hasFreshOptionsInputs, sFieldLabels, sFieldOutputs);
	                        preselection = thisService._computeSelectionFieldPreselection(context, field, refreshMode);
	                    }
	                    sField[Tags.LABEL.SUFFIX] = sFieldLabels;
	                    sField[Tags.OUTPUT.SUFFIX] = sFieldOutputs;
	                    sField[Tags.PRESEL.SUFFIX] = preselection;
	                    view["sFields"][fieldId] = sField;

	                    var toBeOutput = undefined;
	                    if (preselection !== undefined) {
	                        var preselectionIndex = thisService._retrievePreselectionIndex(field, options, preselection);
	                        if (preselectionIndex >= 0) {
	                            toBeOutput = options[preselectionIndex]["value"];
	                        }
	                    }
	                    if (toBeOutput === undefined) {
	                        break;
	                    }

	                    if (!field[Tags.SPLITOUTPUT.LABEL]) {
	                        output[fieldId] = wrm.data.toSingle(wrm.data.Type[type], toBeOutput);
	                    } else if (toBeOutput !== undefined) {
	                        toBeOutput.forEach(function (value) {
	                            Object.keys(value).forEach(function (name) {

	                                /* by construction this object always has only one key */
	                                /* If there is only one slot it's possible to convert the type */
	                                if (toBeOutput.length === 1) {
	                                    output[name] = wrm.data.toSingle(wrm.data.Type[type], value[name]);
	                                } else {
	                                    output[name] = value[name];
	                                }
	                            });
	                        });
	                    }
	                    break;
	            }
	        });
	        return this._normalizeMissingOutputs(output);
	    },

	    /** @override */
	    updateView: function (context) {
	        var thisService = this;
	        var view = context.getView();
	        var refreshMode = context.getFormRefreshMode();

	        view["form"] = view["form"] || {};
	        view["options"] = view["options"] || {};
	        view["fields"] = view["fields"] || {};
	        view["sFields"] = view["sFields"] || {};

	        this._fields.forEach(function (field) {
	            var fieldId = field["id"];
	            var type = wrm.util.obj.getEnumName(wrm.data.Type, field["type"]);
	            switch (field["fieldType"]) {
	                case "Field":
	                    var simpleField = {};
	                    if (refreshMode === RefreshMode.PRESERVE) {
	                        simpleField = view["form"][fieldId];
	                    } else {
	                        simpleField = thisService._computeFieldValue(context, field, refreshMode, wrm.data.Type[type]);
	                    }
	                    view["fields"][fieldId] = simpleField;
	                    view["form"][fieldId] = simpleField;
	                    break;
	                case "SelectionField":
	                    var sField = {};
	                    var sFieldLabels = [];
	                    var sFieldOutputs = [];
	                    var options = [];
	                    var preselection;
	                    if (refreshMode === RefreshMode.PRESERVE) {
	                        sFieldLabels = view["sFields"][fieldId][Tags.LABEL.SUFFIX];
	                        sFieldOutputs = view["sFields"][fieldId][Tags.OUTPUT.SUFFIX];
	                        options = view["options"][fieldId];
	                        preselection = view["form"][fieldId] ? view["form"][fieldId]["value"] : "";
	                    } else {
	                        var hasFreshOptionsInputs = thisService._hasFreshOptionsInputs(context, field);
	                        sFieldLabels = thisService._computeSelectionFieldLabels(context, field, refreshMode, hasFreshOptionsInputs);
	                        sFieldOutputs = thisService._computeSelectionFieldOutputs(context, field, refreshMode, hasFreshOptionsInputs);
	                        options = thisService._computeSelectionFieldOptions(context, field, refreshMode, hasFreshOptionsInputs, sFieldLabels, sFieldOutputs);
	                        preselection = thisService._computeSelectionFieldPreselection(context, field, refreshMode);
	                    }

	                    sField[Tags.LABEL.SUFFIX] = sFieldLabels;
	                    sField[Tags.OUTPUT.SUFFIX] = sFieldOutputs;
	                    sField[Tags.PRESEL.SUFFIX] = preselection;
	                    view["sFields"][fieldId] = sField;

	                    if (preselection !== undefined) {
	                        var preselectionIndex = thisService._retrievePreselectionIndex(field, options, preselection);
	                        if (preselectionIndex >= 0) {
	                            view["form"][fieldId] = options[preselectionIndex];
	                        } else {
	                            view["form"][fieldId] = undefined;
	                        }
	                    }
	                    view["options"][fieldId] = options;
	                    break;
	            }
	        });
	        return view;
	    },

	    /** @override */
	    submitView: function (context) {
	        var output = {};
	        var form = context.getView()["form"] || {};
	        this._fields.forEach(function (field) {
	            var fieldId = field["id"];
	            var type = wrm.util.obj.getEnumName(wrm.data.Type, field["type"]);
	            switch (field["fieldType"]) {
	                case "Field":
	                    output[fieldId] = form[fieldId] !== "" ? wrm.data.toSingle(wrm.data.Type[type], form[fieldId]) : undefined;
	                    break;
	                case "SelectionField":
	                    if (!field[Tags.SPLITOUTPUT.LABEL]) {
	                        output[fieldId] = form[fieldId] ? wrm.data.toSingle(wrm.data.Type[type], form[fieldId].value) : undefined;
	                    } else {
	                        if (form[fieldId] !== undefined && form[fieldId] !== null) {
	                            form[fieldId]["value"].forEach(function (value) {
	                                Object.keys(value).forEach(function (name) {

	                                    /* by construction this object always has only one key */
	                                    /* If there is only one slot it's possible to convert the type */
	                                    if (form[fieldId]["value"].length === 1) {
	                                        output[name] = wrm.data.toSingle(wrm.data.Type[type], value[name]);
	                                    } else {
	                                        output[name] = value[name];
	                                    }
	                                });
	                            });
	                        } else {
	                            field[Tags.OUTPUT.SLOT].forEach(function (slotDescr) {
	                                output[slotDescr["id"]] = undefined;
	                            });
	                        }
	                    }
	                    break;
	            }
	        });
	        return this._normalizeMissingOutputs(output);
	    },

	    /**
	     * @private
	     * @param {!wrm.core.ViewComponentContext} context
	     * @param {!Object} field
	     * @param {!wrm.core.RefreshMode} refreshMode
	     * @param {!wrm.data.Type} type
	     * @return {*|undefined}
	     */
	    _computeFieldValue: function (context, field, refreshMode, type) {
	        var fieldId = field["id"];
	        if (RefreshMode.REFRESH === refreshMode && !context.isFreshInput(fieldId + Tags.PRELOAD.SUFFIX)) {
	            return context.getView()["form"][fieldId];
	        }
	        var input = context.getInput();
	        var preloadedValue = input[fieldId + Tags.PRELOAD.SUFFIX];
	        if (preloadedValue === undefined) {
	            field[Tags.LABEL.SLOT].forEach(function (slot) {
	                var val = input[slot["id"]] || slot["value"];
	                if (preloadedValue === undefined) {
	                    preloadedValue = val;
	                } else {
	                    preloadedValue += " " + val;
	                }
	            });
	        }
	        return wrm.data.toSingle(type, preloadedValue);
	    },

	    /**
	     * @private
	     * @param {!wrm.core.ViewComponentContext} context
	     * @param {!Object} field
	     * @param {!wrm.core.RefreshMode} refreshMode
	     * @param {boolean} hasFreshOptionsInputs
	     * @return {!Array.<string>}
	     */
	    _computeSelectionFieldLabels: function (context, field, refreshMode, hasFreshOptionsInputs) {
	        return this._computeSelectionFieldSlot(Tags.LABEL, context, field, refreshMode, hasFreshOptionsInputs);
	    },

	    /**
	     * @private
	     * @param {!wrm.core.ViewComponentContext} context
	     * @param {!Object} field
	     * @param {!wrm.core.RefreshMode} refreshMode
	     * @param {boolean} hasFreshOptionsInputs
	     * @return {!Array.<string|!Object>}
	     */
	    _computeSelectionFieldOutputs: function (context, field, refreshMode, hasFreshOptionsInputs) {
	        return this._computeSelectionFieldSlot(Tags.OUTPUT, context, field, refreshMode, hasFreshOptionsInputs);
	    },

	    /**
	     * @private
	     * @param {!Object} slot
	     * @param {!wrm.core.ViewComponentContext} context
	     * @param {!Object} field
	     * @param {!wrm.core.RefreshMode} refreshMode
	     * @param {boolean} hasFreshOptionsInputs
	     * @return {!Array.<string|!Object>}
	     */
	    _computeSelectionFieldSlot: function (slot, context, field, refreshMode, hasFreshOptionsInputs) {
	        var fieldId = field["id"];
	        if (RefreshMode.REFRESH === refreshMode && !hasFreshOptionsInputs) {
	            return context.getView()["sFields"][fieldId] ? context.getView()["sFields"][fieldId][slot.SUFFIX] : undefined;
	        }
	        var result = [];
	        var input = context.getInput();
	        var inputValues = input[fieldId + slot.SUFFIX];
	        if (inputValues !== undefined) {
	            // if there are no slots
	            inputValues = wrm.data.toAnyArray(inputValues);
	            return this._normalizeInput(inputValues);
	        } else {
	            // if there are slots
	            var thisService = this;
	            var tmpResult = [];

	            /* take all values for labels (both labels and output) from input or from descriptor */
	            field[slot.SLOT].forEach(function (slot) {
	                var slotId = slot["id"];
	                var inputSlotValues = input[slotId] || slot["value"];
	                if (inputSlotValues) {
	                    inputSlotValues = wrm.data.toAnyArray(inputSlotValues);
	                }
	                tmpResult.push(thisService._normalizeInput(inputSlotValues));
	            });
	            var tmpSize = tmpResult.length;
	            var maxSize = this._maxSize(tmpResult);
	            var i = 0;
	            var j = 0;
	            var concatString;
	            if (!field[Tags.SPLITOUTPUT.LABEL] || slot.SLOT === Tags.LABEL.SLOT) {
	                /* make join for label values, if sizes are different it uses empty string */
	                for (i = 0; i < maxSize; i++) {
	                    concatString = "";
	                    for (j = 0; j < tmpSize; j++) {
	                        if (tmpResult[j].length === 1) {
	                            concatString += tmpResult[j][0];
	                        } else {
	                            concatString += tmpResult[j][i] || "";
	                        }
	                    }
	                    result.push(concatString);
	                }
	            } else {
	                var outputObj;
	                // keep output separated, if sizes are different it uses empty string
	                for (i = 0; i < maxSize; i++) {
	                    outputObj = [];
	                    for (j = 0; j < tmpSize; j++) {
	                        var slotobj = {};
	                        slotobj[field[Tags.OUTPUT.SLOT][j]["id"]] = tmpResult[j][i] || "";
	                        outputObj.push(slotobj);
	                    }
	                    result.push(outputObj);
	                }
	            }
	        }
	        return result;
	    },

	    /**
	     * @private
	     * @param {!wrm.core.ViewComponentContext} context
	     * @param {!Object} field
	     * @param {!wrm.core.RefreshMode} refreshMode
	     * @param {boolean} hasFreshOptionsInputs
	     * @param {!Array.<string>} labels
	     * @param {!Array.<string>} outputs
	     * @return {!Array.<!Object>}
	     */
	    _computeSelectionFieldOptions: function (context, field, refreshMode, hasFreshOptionsInputs, labels, outputs) {
	        var fieldId = field["id"];
	        if (RefreshMode.REFRESH === refreshMode && !hasFreshOptionsInputs) {
	            return context.getView()["options"][fieldId];
	        }
	        var options = [];
	        var i = 0;

	        if (labels.length > outputs.length) {
	            for (i = 0; i < labels.length; i++) {
	                var option = {};
	                option["label"] = labels[i];
	                option["value"] = outputs[i] || "";
	                options.push(option);
	            }
	        } else {
	            for (i = 0; i < outputs.length; i++) {
	                var option = {};
	                option["value"] = outputs[i];
	                option["label"] = labels[i] || "";
	                options.push(option);
	            }
	        }

	        return options;
	    },

	    /**
	     * @private
	     * @param {!wrm.core.ViewComponentContext} context
	     * @param {!Object} field
	     * @return {string|!Object}
	     */
	    _computeSelectionFieldPreselection: function (context, field, refreshMode) {
	        var fieldId = field["id"];

	        if (RefreshMode.REFRESH === refreshMode && !this._hasFreshPreselInputs(context, field)) {
	            return context.getView()["form"][fieldId] ? context.getView()["form"][fieldId]["value"] : undefined;
	        }

	        var input = context.getInput();

	        if (!field[Tags.SPLITOUTPUT.LABEL]) {
	            // splitOutput == false means that value property of option object is
	            // exactly what I'm looking for
	            return input[fieldId + Tags.PRESEL.SUFFIX] || field["preselectValue"];
	        } else {
	            // splitOutput == true means that value property of option object is an object
	            var preselectValue = field["preselectValue"].split("|");
	            var preselection = {};
	            field[Tags.OUTPUT.SLOT].forEach(function (slot, index) {
	                preselection[slot["id"]] = input[slot["id"] + Tags.PRESEL.SUFFIX] || preselectValue[index];
	            });
	            return preselection;
	        }
	    },

	    /**
	     * @private
	     * @param {!Object} field
	     * @param {!Object} options
	     * @param {string|!Object} preSelection
	     * @return {number}
	     */
	    _retrievePreselectionIndex: function (field, options, preSelection) {
	        var thisService = this;
	        var found = false;
	        var index = 0;
	        var foundIndex = 0;
	        var currentOption;

	        if (Array.isArray(preSelection)) {
	            var presel = {};
	            preSelection.forEach(function (obj) {
	                Object.keys(obj).forEach(function (key) {
	                    presel[key] = obj[key];
	                });
	            });
	            preSelection = presel;
	        }

	        for (index = 0; index < options.length; index++) {
	            currentOption = options[index]["value"];
	            if (!field[Tags.SPLITOUTPUT.LABEL]) {
	                if (wrm.data.equal(currentOption, preSelection)) {
	                    found = true;
	                    foundIndex = index;
	                    break;
	                }
	            } else {
	                currentOption = thisService._normalizeOptions(currentOption);
	                Object.keys(currentOption).forEach(function (slotId) {
	                    if (!preSelection[slotId]) {
	                        found = false;
	                        return;
	                    } else {
	                        if (wrm.data.equal(currentOption[slotId], preSelection[slotId])) {
	                            found = true;
	                            foundIndex = index;
	                            return;
	                        }
	                    }
	                });
	            }
	        }
	        if (!found) {
	            return -1;
	        }
	        return foundIndex;
	    },

	    /**
	     * @private
	     * @param {!Array.<!Object>} arrayValues
	     * @returns {!Object}
	     */
	    _normalizeOptions: function (arrayValues) {
	        var result = {};
	        arrayValues.forEach(function (option) {
	            Object.keys(option).forEach(function (key) {
	                result[key] = option[key];
	            });
	        });
	        return result;
	    },

	    /**
	     * @private
	     * @param {!wrm.core.ViewComponentContext} context
	     * @param {!Object} field
	     * @return {boolean}
	     */
	    _hasFreshOptionsInputs: function (context, field) {
	        var formTags = Tags;

	        /* Check if input 'label' is fresh */
	        if (context.isFreshInput(field["id"]) || context.isFreshInput(field["id"] + formTags.LABEL.SUFFIX)) {
	            return true;
	        }

	        /* Check if input 'output' is fresh */
	        if (context.isFreshInput(field["id"]) || context.isFreshInput(field["id"] + formTags.OUTPUT.SUFFIX)) {
	            return true;
	        }

	        var hasFreshOptionsInputs = false;

	        /* Check if input 'label' slots are fresh */
	        field[Tags.LABEL.SLOT].forEach(function (slot) {
	            if (context.isFreshInput(slot["id"]) || context.isFreshInput(slot["id"] + formTags.LABEL.SUFFIX)) {
	                hasFreshOptionsInputs = true;
	                return;
	            }
	        });

	        /* Check if input 'output' slots are fresh */
	        field[Tags.OUTPUT.SLOT].forEach(function (slot) {
	            if (context.isFreshInput(slot["id"]) || context.isFreshInput(slot["id"] + formTags.OUTPUT.SUFFIX)) {
	                hasFreshOptionsInputs = true;
	                return;
	            }
	        });

	        return hasFreshOptionsInputs;
	    },

	    /**
	     * @private
	     * @param {!wrm.core.ViewComponentContext} context
	     * @param {!Object} field
	     * @return {boolean}
	     */
	    _hasFreshPreselInputs: function (context, field) {
	        var preselSuffix = Tags.PRESEL.SUFFIX;

	        /* Check if presel is fresh */
	        if (context.isFreshInput(field["id"] + preselSuffix)) {
	            return true;
	        }

	        var hasFreshPreselInputs = false;

	        /* Check if input 'label' slots are fresh */
	        field[Tags.LABEL.SLOT].forEach(function (slot) {
	            if (context.isFreshInput(slot["id"] + preselSuffix)) {
	                hasFreshPreselInputs = true;
	                return;
	            }
	        });

	        /* Check if input 'output' slots are fresh */
	        field[Tags.OUTPUT.SLOT].forEach(function (slot) {
	            if (context.isFreshInput(slot["id"] + preselSuffix)) {
	                hasFreshPreselInputs = true;
	                return;
	            }
	        });

	        return hasFreshPreselInputs;
	    },

	    /**
	     * @private
	     * @param {!Array.<*>} input
	     * @return {!Array.<*>}
	     */
	    _normalizeInput: function (input) {
	        if (input.length === 1) {
	            input = wrm.data.toString(input[0]).split("|");
	        }
	        return input;
	    },

	    /**
	     * @private
	     * @param {!Object} outputs
	     * @return {!Object}
	     */
	    _normalizeMissingOutputs: function (outputs) {
	        for (var key in outputs) {
	            if (!outputs.hasOwnProperty(key)) {
	                continue;
	            }
	            if (outputs[key] === undefined) {
	                outputs[key] = null;
	            }
	        }
	        return outputs;
	    },

	    /**
	     * @private
	     * @param {Array.<Array>} inputArray
	     * @return {number}
	     */
	    _maxSize: function (inputArray) {
	        var result = 0;
	        inputArray.forEach(function (input) {
	            if (input.length > result) {
	                result = input.length;
	            }
	        });
	        return result;
	    } });

	/** @private */
	var Tags = {
	    LABEL: {
	        SLOT: "labelSlots",
	        SUFFIX: "_label"
	    },
	    OUTPUT: {
	        SLOT: "outputSlots",
	        SUFFIX: "_output"
	    },
	    SPLITOUTPUT: {
	        LABEL: "splitOutput"
	    },
	    PRESEL: {
	        SUFFIX: "_presel"
	    },
	    PRELOAD: {
	        SUFFIX: "_preload"
	    }
	};
	module.exports = exports.default;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for View Component view components.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractCachedViewComponentService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractCachedViewComponentService, {

	    /** @override */
	    createResult: function (context) {
	        return {};
	    }

	});
	module.exports = exports.default;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Map view component.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractViewComponentService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractViewComponentService, {

	    /** @override */
	    initialize: function (descr) {},

	    /** @override */
	    computeOutput: function (context) {
	        var view = context.getView();
	        return this._createOutput(view);
	    },

	    /** @override */
	    catchEvent: function (context, event) {
	        var view = context.getView();
	        view["_markerIndex"] = event.getParameters()["position"];
	    },

	    /** @override */
	    submitView: function (context) {
	        var view = context.getView();
	        return this._createOutput(view);
	    },

	    /**
	     * @param {!Object} view
	     * @return {!Object}
	     */
	    _createOutput: function (view) {
	        var output = {};
	        var markers = view["_markers"];
	        var markerIndex = view["_markerIndex"];
	        for (var i = 0; i < markers.length; i++) {
	            if (markers[i].get("wrIndex") === markerIndex) {
	                output["locationId"] = markers[i].get("locationId");
	                break;
	            }
	        }
	        return output;
	    },

	    /** @override */
	    updateView: function (context) {
	        var thisService = this;
	        var log = this.getLog();
	        var view = context.getView();
	        var input = context.getInput();
	        var promise = null;
	        var infoClickListener = null;
	        var renderDefer = null;

	        if (!view["$render"]) {
	            view["$render"] = function render(element) {
	                if (!element) {
	                    throw new ReferenceError("Missing element");
	                }

	                thisService._initializeMap(view).then(function (map) {
	                    map.setDiv(element);
	                    map.setVisible(true);

	                    view["_locationsPromise"].then(function () {
	                        thisService._setMapPosition(map, view["_locations"]).then(function () {
	                            thisService._setMarkers(view);
	                        });
	                    });
	                });
	            };
	        }

	        if (!view["$destroy"]) {
	            view["$destroy"] = function destroy() {
	                view["map"] && view["map"].remove();
	                delete view["map"];
	                delete view["_mapPromise"];
	                delete view["_markers"];
	            };
	        }

	        /* initialize the infoWindowClick */
	        if (!view["infoWindowClick"]) {
	            view["infoWindowClick"] = new wrm.util.ListenerList();;
	        }

	        view["_locations"] = this._computeLocationsValues(input);
	        view["_locationsPromise"] = this._computeLocationsPositions(view["_locations"]);

	        if (view["map"]) {
	            view["_locationsPromise"].then(function () {
	                thisService._setMapPosition(view["map"], view["_locations"]).then(function () {
	                    thisService._setMarkers(view);
	                });
	            });
	        }
	    },

	    /**
	      * @private
	      */
	    _initializeMap: function (view) {
	        if (view["map"]) {
	            view["_mapPromise"] = Promise.resolve(view["map"]);
	            return view["_mapPromise"];
	        }

	        if (view["_mapPromise"]) {
	            return view["_mapPromise"];
	        }

	        var MAP_INIT_OPTIONS = {
	            "controls": {
	                "compass": false,
	                "myLocationButton": false,
	                "indoorPicker": false,
	                "zoom": false
	            },
	            "gestures": {
	                "scroll": true,
	                "tilt": false,
	                "rotate": false,
	                "zoom": true
	            }
	        };
	        view["_mapPromise"] = new Promise(function (resolve, reject) {
	            var map = plugin.google.maps.Map.getMap(MAP_INIT_OPTIONS);
	            map.on(plugin.google.maps.event.MAP_READY, function (map) {
	                map.clear();
	                view["map"] = map;
	                resolve(map);
	            });
	        });

	        return view["_mapPromise"];
	    },

	    /**
	      * @private
	      */
	    _createMarker: function (map, markerValues, index, infoClickCallback) {
	        var thisService = this;

	        if (!markerValues["_position"]) {
	            return Promise.resolve();
	        }

	        var markerInfo = {
	            "position": markerValues["_position"],
	            "title": markerValues["titles"],
	            "snippet": markerValues["snippets"],
	            "locationId": markerValues["locationIds"],
	            "address": markerValues["addresses"],
	            "latitude": markerValues["latitudes"],
	            "longitude": markerValues["longitudes"],
	            "wrIndex": index,
	            "infoClick": infoClickCallback
	        };
	        return new Promise(function (resolve, reject) {
	            map.addMarker(markerInfo, function (result) {
	                resolve(result);
	            });
	        });
	    },

	    /**
	      * @private
	      * @return {!Promise}
	      */
	    _retriveLatLng: function (markerValues) {

	        var thisService = this;
	        var log = this.getLog();
	        if (markerValues["addresses"]) {
	            return this._geocode(markerValues["addresses"]).then(function (position) {
	                return new plugin.google.maps.LatLng(position["lat"], position["lng"]);
	            })["catch"](function (error) {
	                log.warn("Unable to retrive latitude and longitude for '" + markerValues["addresses"] + "'");
	            });
	        } else if (markerValues["latitudes"] && markerValues["longitudes"]) {
	            return Promise.resolve(new plugin.google.maps.LatLng(markerValues["latitudes"], markerValues["longitudes"]));
	        } else {

	            // log.warn("Impossible to compute position for marker:", markerValues);
	            return Promise.resolve();
	            // throw new Error("Marker doesn't have valid address or valid latitude, longitude.");
	        }
	    },

	    /**
	       * @private
	       */
	    _setMapPosition: function (map, locations) {
	        var thisService = this;
	        var log = this.getLog();

	        return new Promise(function (resolve, reject) {
	            if (!locations || locations.length === 0) {
	                thisService._geolocate(map).then(function (result) {
	                    map.moveCamera({
	                        "target": result["latLng"],
	                        "zoom": 14
	                    }, function () {
	                        log.debug("No markers, map centered on current position.");
	                        resolve();
	                    });
	                }, function (e) {
	                    log.error(e);
	                    resolve();
	                });
	            } else if (locations.length === 1) {
	                map.moveCamera({
	                    "target": locations[0]["_position"],
	                    "zoom": 14
	                }, function () {
	                    log.debug("Map centered on single marker.");
	                    resolve();
	                });
	            } else {
	                var positions = [];
	                locations.forEach(function (location) {
	                    if (location["_position"]) {
	                        positions.push(location["_position"]);
	                    }
	                });

	                map.moveCamera({
	                    "target": positions
	                }, function () {
	                    log.debug("Map centered to current markers.");
	                    resolve();
	                });
	            }
	        });
	    },

	    /**
	      * @private
	      */
	    _updateMarker: function (marker, markerValues, index) {
	        if (marker.getTitle() !== markerValues["titles"]) {
	            marker.setTitle(markerValues["titles"]);
	        }
	        if (marker.getSnippet() !== markerValues["snippets"]) {
	            marker.setSnippet(markerValues["snippets"]);
	        }
	        if (marker.get("locationId") !== markerValues["locationIds"]) {
	            marker.set("locationId", markerValues["locationIds"]);
	        }
	        if (marker.get("wrIndex") !== index) {
	            marker.set("wrIndex", markerValues["wrIndex"]);
	        }

	        var positionChanged = false;
	        if (marker.get("address") !== markerValues["addresses"]) {
	            marker.set("address", markerValues["addresses"]);
	            positionChanged = true;
	        }
	        if (marker.get("latitude") !== markerValues["latitudes"]) {
	            marker.set("latitude", markerValues["latitudes"]);
	            positionChanged = true;
	        }
	        if (marker.get("longitude") !== markerValues["longitudes"]) {
	            marker.set("longitude", markerValues["longitudes"]);
	            positionChanged = true;
	        }
	        if (positionChanged) {
	            marker.setPosition(markerValues["_position"]);
	        }

	        return Promise.resolve(marker);
	    },

	    /**
	      * @private
	      */
	    _removeMarker: function (marker) {
	        marker.remove();
	    },

	    /**
	       * @private
	       */
	    _setMarkers: function (view) {
	        var thisService = this;
	        var log = this.getLog();
	        var map = view["map"];
	        var infoClickListener = view["infoWindowClick"];
	        var newMarkersValues = view["_locations"];
	        var existingMarkers = [];
	        var mPromise = Promise.resolve();

	        if (!view["_markers"]) {
	            view["_markers"] = [];
	        }
	        var markers = view["_markers"];

	        /* Retrieve old markers locationIds */
	        var markersId = [];
	        for (var i = 0; i < markers.length; i++) {
	            markersId.push(markers[i].get("locationId"));
	        }

	        function infoClickCallback(marker) {
	            infoClickListener.notifyAll(marker.get("wrIndex"));
	        }

	        newMarkersValues.forEach(function (markerValues, i) {
	            var markerIndex = markersId.indexOf(markerValues["locationIds"]);
	            if (markerIndex < 0) {
	                // new marker
	                mPromise = mPromise.then(function () {
	                    if (!view["map"]) {
	                        // ignore if map is destroyed
	                        return;
	                    }

	                    return thisService._createMarker(view["map"], markerValues, i, infoClickCallback).then(function (marker) {
	                        if (marker) {
	                            markers.push(marker);
	                        }
	                    });
	                });
	            } else {
	                // existing marker
	                existingMarkers.push(markerValues["locationIds"]);
	                var marker = markers[markerIndex];
	                mPromise = mPromise.then(function () {
	                    if (!view["map"]) {
	                        return;
	                    }

	                    return thisService._updateMarker(marker, markerValues, i);
	                });
	            }
	        });

	        /* remove markers not present in the new data */
	        for (var i = 0; i < markersId.length; i++) {
	            var locationId = markersId[i];
	            if (existingMarkers.indexOf(locationId) < 0) {
	                // not present in updated markers
	                var markerIndex = -1;
	                for (var y = 0; y < markers.length; y++) {
	                    if (markers[y].get("locationId") === locationId) {
	                        markerIndex = y;
	                        break;
	                    }
	                }
	                if (markerIndex >= 0) {
	                    var marker = markers[markerIndex];
	                    markers.splice(markerIndex, 1);
	                    thisService._removeMarker(marker);
	                } else {}
	            }
	        }

	        return mPromise;
	    },

	    /**
	      * @private
	      * @param {!String} address
	      * @return {!Promise<{lat:number, lng:number}>}
	      */
	    _geocode: function (address) {
	        return new Promise(function (resolve, reject) {
	            plugin.google.maps.Geocoder.geocode({ address: address }, function (results) {
	                if (results.length) {
	                    var result = results[0];
	                    var position = result.position;
	                    resolve(position);
	                } else {
	                    reject("Unable to geocode the address");
	                }
	            });
	        });
	    },

	    /**
	      * @private
	      */
	    _geolocate: function (map) {
	        return new Promise(function (resolve, reject) {

	            var onSuccess = function (location) {
	                var position = location;
	                resolve(position);
	            };

	            var onError = function (msg) {
	                reject("error: " + msg);
	            };
	            map.getMyLocation(onSuccess, onError);
	        });
	    },

	    /**
	      * @private
	      * @param {!wrm.nav.Input} input
	      * @returns {!Array.<Object>}
	      */
	    _computeLocationsValues: function (input) {
	        var properties = ["addresses", "images", "latitudes", "locationIds", "longitudes", "snippets", "titles"];

	        var result = [];

	        /* Normalize input values, turning them in arrays of the same length */
	        var normalizedInput = {};
	        var maxLength = 0;
	        for (var i = 0; i < properties.length; i++) {
	            var property = properties[i];
	            var propertyInput = input[property];
	            if (propertyInput !== undefined) {
	                if (angular.isArray(propertyInput)) {
	                    if (maxLength === 0 || maxLength === 1) {
	                        maxLength = propertyInput.length;
	                    } else if (maxLength !== propertyInput.length) {
	                        throw new Error("Input array lengths do not match");
	                    }
	                } else {
	                    propertyInput = [propertyInput];
	                    maxLength = maxLength || 1;
	                }
	                normalizedInput[property] = propertyInput;
	            }
	        }

	        /*
	          * Collect properties at the same indexes into separate value-holding objects
	          */
	        if (maxLength) {
	            for (var k = 0; k < maxLength; k++) {
	                var tmpObj = {};
	                Object.keys(normalizedInput).forEach(function (propertyId) {
	                    if (normalizedInput[propertyId].length === 1) {
	                        tmpObj[propertyId] = normalizedInput[propertyId][0];
	                    } else {
	                        tmpObj[propertyId] = normalizedInput[propertyId][k];
	                    }
	                });
	                result.push(tmpObj);
	            }
	        }

	        return result;
	    },

	    /**
	      * @private
	      * @param {!Array.<Object>} locations
	      * @returns {!Promise}
	      */
	    _computeLocationsPositions: function (locations) {
	        var thisService = this;
	        var log = this.getLog();
	        var promise = Promise.resolve();
	        var invalidPositions = [];

	        locations.forEach(function (location) {
	            promise = promise.then(function () {
	                return thisService._retriveLatLng(location).then(function (latLng) {
	                    location["_position"] = latLng;
	                    if (!latLng) {
	                        invalidPositions.push({ "locationId": location["locationIds"], "title": location["titles"] });
	                    }
	                });
	            });
	        });

	        promise = promise.then(function () {
	            if (invalidPositions.length) {
	                log.warn("Failed to compute position for " + invalidPositions.length + " markers", invalidPositions);
	            }
	        });

	        return promise;
	    }
	});
	module.exports = exports.default;

	// We didn't find the old marker!!! Something goes wrong!!!

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Selector view components and operations.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractCachedViewComponentService
	 * @implements wrm.OperationService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractCachedViewComponentService, {

	    /** @override */
	    initialize: function (descr) {
	        var thisService = this;

	        /**
	         * @private
	         * @type {!wrm.data.meta.Entity}
	         */
	        this._entity; // init'd below

	        /**
	         * @private
	         * @type {string}
	         */
	        this._entityId; // init'd below

	        // TODO cache query instead
	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._condExpr; // init'd below

	        /**
	         * @private
	         * @type {!number}
	         */
	        this._maxResults = descr["maxResults"];

	        /**
	         * @private
	         * @type {!boolean}
	         */
	        this._distinct = descr["distinct"] || false;

	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._output; // init'd below

	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._toBind; // init'd below

	        /**
	         * @private
	         * @type {!Array}
	         */
	        this._order = descr["order"];

	        /**
	         * @private
	         * @type {!wrm.data.DataService}
	         */
	        this._dataService; // init'd below

	        return this.getManager().getDataService().then(function (dataService) {
	            thisService._dataService = dataService;
	            thisService._entity = dataService.getMetadata().getEntity(descr["entity"]);
	            thisService._entityid = thisService._entity.getId();
	            thisService._condExpr = descr["condExprs"];
	            var output = descr["output"];
	            thisService._output = {};
	            thisService._toBind = {};
	            if (output.length !== 0) {
	                output.forEach(function (column) {
	                    thisService._output[column["viewName"]] = column["ref"];
	                    thisService._toBind[column["viewName"]] = column["bindName"];
	                });
	            } else {
	                var keyAtt = thisService._entity.getKeyAttribute();
	                thisService._output[keyAtt.getName()] = keyAtt.getId();
	                thisService._toBind[keyAtt.getName()] = keyAtt.getId();
	            }
	        });
	    },

	    /** @override */
	    executeOperation: function (context) {
	        var resultsPromise = this._askResult(context.getInput());
	        var thisService = this;

	        return resultsPromise.then(function (rows) {

	            var outputResult = [];
	            var toBind = thisService._toBind;
	            var outputLabels = thisService._output;

	            rows.forEach(function (currentRow) {
	                var outputData = {};
	                Object.keys(outputLabels).forEach(function (key) {
	                    outputData[toBind[key]] = currentRow[key];
	                });
	                outputResult.push(outputData);
	            });

	            var output = {
	                "data": wrm.util.obj.extractPropertyValues(outputResult),
	                "dataSize": rows.length
	            };

	            var code = output["dataSize"] === 0 ? "success.Not Found" : "success";
	            return new wrm.nav.Output(code, output);
	        }, function (e) {
	            return new wrm.nav.Output("error");
	        });
	    },

	    /** @override */
	    createResult: function (context) {
	        var input = context.getInput();
	        var thisService = this;
	        var resultsPromise = this._askResult(input);

	        return resultsPromise.then(function (rows) {

	            var outputResult = [];
	            var toBind = thisService._toBind;
	            var outputLabels = thisService._output;

	            rows.forEach(function (currentRow) {
	                var outputData = {};
	                Object.keys(outputLabels).forEach(function (key) {
	                    outputData[toBind[key]] = currentRow[key];
	                });
	                outputResult.push(outputData);
	            });

	            var output = {
	                "data": wrm.util.obj.extractPropertyValues(outputResult),
	                "dataSize": rows.length
	            };

	            return output;
	        }, function (e) {
	            thisService.getLog().error(e);
	        });
	    },

	    /** @override */
	    computeOutputFromResult: function (context, result) {
	        var output = {
	            "data": result["data"],
	            "dataSize": result["dataSize"]
	        };
	        return output;
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @returns {Promise|Array.<Object>}
	     */
	    _askResult: function (input) {
	        var thisService = this;
	        return this._dataService.execute(function (d) {
	            var options = {
	                output: thisService._output,
	                outputConfig: { useNames: true },
	                distinct: thisService._distinct,
	                filter: thisService._condExpr,
	                order: thisService._order
	            };

	            var resultsLength = input["maxResults"] || thisService._maxResults;
	            if (resultsLength > 0) {
	                var limit = {
	                    count: resultsLength
	                };
	                options["limit"] = limit;
	            }

	            return d.select(thisService._entityid, options, input);
	        });
	    } });
	module.exports = exports.default;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Create operations.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractOperationService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractOperationService, {

	    /** @override */
	    initialize: function (descr) {
	        var thisService = this;

	        /**
	         * @private
	         * @type {!wrm.data.meta.Entity}
	         */
	        this._entity; // init'd below

	        /**
	         * @private
	         * @type {boolean}
	         */
	        this._bulk = descr["bulk"] || false;

	        /**
	         * @private
	         * @type {!wrm.data.DataService}
	         */
	        this._dataService; // init'd below

	        return this.getManager().getDataService().then(function (dataService) {
	            thisService._entity = dataService.getMetadata().getEntity(descr["entity"]);
	            thisService._dataService = dataService;
	        });
	    },

	    /** @override */
	    executeOperation: function (context) {
	        var input = context.getInput();

	        /* Create the creation promise */
	        var createPromise = this._executeCreate(input);

	        /* Output the created attribute values */
	        return createPromise.then(function (createdValues) {
	            return new wrm.nav.Output("success", createdValues);
	        });
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @return {!Promise.<!wrm.nav.Output>}
	     */
	    _executeCreate: function (input) {
	        var entityId = this._entity.getId();
	        var keyAttrId = this._entity.getKeyAttribute().getId();
	        var dataService = this._dataService;

	        /* Prepare new object(s) */
	        var newValues;
	        if (!this._bulk) {
	            newValues = [this._computeInsertValues(input)];
	        } else {
	            newValues = this._computeInsertValuesFromBulk(input);
	        }

	        /* Insert in database */
	        return this._dataService.execute(function (d) {
	            return d.insert(entityId, newValues);
	        }).then(function (insertedKeys) {

	            /* Add inserted keys to all new objects that were inserted */
	            for (var i = 0; i < insertedKeys.length; i++) {
	                newValues[i][keyAttrId] = insertedKeys[i];
	            }

	            return dataService.extractPropertyValuesById(newValues, entityId);
	        });
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @returns {!Object}
	     */
	    _computeInsertValues: function (input) {
	        var result = {};
	        this._entity.getProperties().forEach(function (property) {
	            var propertyId = property.getId();
	            if (input[propertyId] !== undefined) {
	                result[propertyId] = input[propertyId];
	            }
	        });
	        return result;
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @returns {!Array.<Object>}
	     */
	    _computeInsertValuesFromBulk: function (input) {
	        var properties = this._entity.getProperties();

	        var result = [];

	        /* Normalize input values, turning them in arrays of the same length */
	        var normalizedInput = {};
	        var maxLength = 1;
	        for (var i = 0; i < properties.length; i++) {
	            var property = properties[i];
	            var propertyInput = input[property.getId()];
	            if (propertyInput !== undefined) {
	                if (angular.isArray(propertyInput)) {
	                    if (maxLength === 1) {
	                        maxLength = propertyInput.length;
	                    } else if (maxLength !== propertyInput.length) {
	                        throw new Error("Input array lengths do not match");
	                    }
	                } else {
	                    propertyInput = [propertyInput];
	                }
	                normalizedInput[property.getId()] = propertyInput;
	            }
	        }

	        /* Collect properties at the same indexes into separate value-holding objects */
	        for (var k = 0; k < maxLength; k++) {
	            var tmpObj = {};
	            Object.keys(normalizedInput).forEach(function (propertyId) {
	                if (normalizedInput[propertyId].length === 1) {
	                    tmpObj[propertyId] = normalizedInput[propertyId][0];
	                } else {
	                    tmpObj[propertyId] = normalizedInput[propertyId][k];
	                }
	            });
	            result.push(tmpObj);
	        }

	        return result;
	    } });
	module.exports = exports.default;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Update operations.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractOperationService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractOperationService, {

	    /** @override */
	    initialize: function (descr) {
	        var thisService = this;

	        /**
	         * @private
	         * @type {!wrm.data.meta.Entity}
	         */
	        this._entity; // init'd below

	        /**
	         * @private
	         * @type {boolean}
	         */
	        this._userServiceMode = descr["userService"] || false;

	        /**
	         * @private
	         * @type {boolean}
	         */
	        this._bulk = descr["bulk"] || false;

	        /**
	         * @private
	         * @type {!wrm.data.Condition}
	         */
	        this._condition; // init'd below

	        /**
	         * @private
	         * @type {!wrm.data.Condition}
	         */
	        this._keyCondition; // init'd below

	        /**
	         * @private
	         * @type {!wrm.data.DataService}
	         */
	        this._dataService; // init'd below

	        return this.getManager().getDataService().then(function (dataService) {
	            thisService._entity = dataService.getMetadata().getEntity(descr["entity"]);
	            thisService._condition = dataService.prepareCondition(thisService._entity.getId(), descr["condExprs"]);
	            var keyId = thisService._entity.getKeyAttribute().getId();
	            thisService._keyCondition = dataService.prepareCondition(thisService._entity.getId(), {
	                "property": keyId,
	                "operator": "eq",
	                "valueInput": "keyId",
	                "config": {
	                    "oneImpliedInputRequired": false
	                }
	            });
	            thisService._dataService = dataService;
	        });
	    },

	    /** @override */
	    executeOperation: function (context) {
	        var input = context.getInput();

	        /* Update in a different way for User and other entities */
	        var updatePromise;
	        if (this._userServiceMode) {
	            updatePromise = this._executeUserUpdate(input);
	        } else {
	            updatePromise = this._executeOtherUpdate(input);
	        }

	        /* Output the updated keys */
	        var keyAttrId = this._entity.getKeyAttribute().getId();
	        return updatePromise.then(function (updatedKeys) {
	            var output = {};
	            output[keyAttrId] = updatedKeys;
	            var code = updatedKeys.length === 0 ? "success.Not Found" : "success";
	            return new wrm.nav.Output(code, output);
	        });
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @return {!Promise.<!Array>}
	     */
	    _executeUserUpdate: function (input) {
	        var manager = this.getManager();

	        /* Update through the security service (will also update on database) */
	        var oldPassword = wrm.data.toString(input["oldPassword"]) || null;
	        var newPassword = wrm.data.toString(input["newPassword"]) || null;
	        var newValues = this._computeUpdateValues(input, 0);
	        return manager.getSecurityService().then(function (securityService) {
	            return securityService.updateUserInfo(newValues, oldPassword, newPassword);
	        }).then(function (newUserInfo) {
	            var key = newUserInfo.getLocalKey();
	            return key !== undefined ? [key] : [];
	        });
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @return {!Promise.<!Array>}
	     */
	    _executeOtherUpdate: function (input) {
	        if (this._bulk) {
	            return this._updateBulk(input);
	        } else {
	            return this._updateSingle(input);
	        }
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @return {!Promise.<!Array>}
	     */
	    _updateSingle: function (input) {
	        var condition = this._condition;
	        var entityId = this._entity.getId();

	        /* Update on database */
	        var newObject = this._computeUpdateValues(input, 0);
	        return this._dataService.execute(function (d) {
	            return d.update(entityId, {
	                filter: condition,
	                update: newObject
	            }, input);
	        });
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @return {!Promise.<!Array>}
	     */
	    _updateBulk: function (input) {
	        var thisService = this;
	        var condition = this._condition;
	        var entityId = this._entity.getId();
	        var promises = [];
	        var found = false;

	        return this._dataService.execute(function (d) {
	            thisService._entity.getProperties().forEach(function (property) {
	                var propertyId = property.getId();
	                if (input[propertyId]) {
	                    if (!angular.isArray(input[propertyId])) {
	                        input[propertyId] = [input[propertyId]];
	                    }
	                    if (!found) {
	                        found = true;
	                        input[propertyId].forEach(function (key, index) {
	                            var newObject = thisService._computeUpdateValues(input, index);
	                            var bulkInput = {};
	                            Object.keys(input).forEach(function (key) {
	                                if (angular.isArray(input[key])) {
	                                    bulkInput[key] = input[key][index];
	                                } else {
	                                    bulkInput[key] = input[key];
	                                }
	                            });
	                            promises.push(d.update(entityId, {
	                                filter: condition,
	                                update: newObject
	                            }, bulkInput));
	                        });
	                    }
	                }
	            });

	            return Promise.all(promises).then(function (results) {
	                var updatedObjectsKeys = [];
	                results.forEach(function (updatedObj) {
	                    updatedObj.forEach(function (key) {
	                        updatedObjectsKeys.push(key);
	                    });
	                });
	                return updatedObjectsKeys;
	            });
	        });
	    },

	    /**
	     * @private
	     * @param {!Object} newObject
	     * @param {!Object} input
	     * @return {!Promise}
	     */
	    _execUpdate: function (newObject, input) {
	        var thisService = this;
	        var entityId = this._entity.getId();
	        return this._dataService.execute(function (d) {
	            return d.update(entityId, {
	                output: entityId,
	                filter: thisService._keyCondition,
	                update: newObject
	            }, input);
	        });
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @param {number} index
	     * @returns {!Object}
	     */
	    _computeUpdateValues: function (input, index) {
	        var result = {};
	        var position = 0;
	        this._entity.getProperties().forEach(function (property) {
	            var propertyId = property.getId();
	            if (input[propertyId] !== undefined) {
	                if (!angular.isArray(input[propertyId])) {
	                    input[propertyId] = [input[propertyId]];
	                }
	                var length = input[propertyId].length;
	                if (length > 1 && index > length) {
	                    throw new Error("Lengths of input arrays differ");
	                } else if (length === 1) {
	                    position = 0;
	                } else {
	                    position = index;
	                }

	                result[propertyId] = input[propertyId][position];
	            }
	        });
	        return result;
	    } });
	module.exports = exports.default;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Switch operations.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractOperationService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractOperationService, {

	    /** @override */
	    initialize: function (descr) {

	        /**
	         * @private
	         * @type {!Object.<string, boolean>}
	         */
	        this._codes = descr["codes"];
	    },

	    /** @override */
	    executeOperation: function (context) {
	        var navName = "";
	        var input = context.getInput()["switch"];
	        var result = {};
	        result["switch"] = input;

	        if (angular.isArray(input)) {
	            input = input[0];
	        }

	        input = wrm.data.toString(input);

	        if (input === null || input === undefined || input === "") {
	            navName = "success.<EMPTY>";
	        } else if (this._codes[input]) {
	            navName = "success." + input;
	        } else {
	            navName = "success";
	        }
	        return new wrm.nav.Output(navName, result);
	    } });
	module.exports = exports.default;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Restful Request Response operations.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractOperationService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractOperationService, {

	    /** @override */
	    initialize: function (descr) {

	        /** @private */
	        this._requestInputs = this._createDataParameterInfos(descr["requestInputs"]);

	        /** @private */
	        this._responseOutputs = this._createDataParameterInfos(descr["responseOutputs"]);

	        /** @private */
	        this._requestHeaderInputs = this._createHeaderParameterInfos(descr["requestHeaderInputs"]);

	        /** @private */
	        this._responseHeaderOutputs = this._createHeaderParameterInfos(descr["responseHeaderOutputs"]);

	        /**
	         * @private
	         * @type {!string}
	         */
	        this._method = descr["method"];

	        /**
	         * @private
	         * @type {!string}
	         */
	        this._url = descr["url"];

	        /**
	         * @private
	         * @type {?{username:string, password:string}}
	         */
	        this._httpAuthentication = descr["httpAuthentication"] || null;

	        /**
	         * @private
	         * @type {?RequestType}
	         */
	        this._requestType = descr["requestType"] ? wrm.util.obj.castEnumValue(RequestType, descr["requestType"]) : null;

	        /**
	         * @private
	         * @type {!ResponseType}
	         */
	        this._responseType = wrm.util.obj.castEnumValue(ResponseType, descr["responseType"]);

	        /**
	         * @private
	         * @type {number}
	         */
	        this._timeout = descr["timeout"];

	        /* Check some descriptor consistency */
	        if (!this._url) {
	            throw new Error("Unspecified endpoint URL");
	        }
	    },

	    /**
	     * @private
	     * @param {!Array<!Object>} paramsDescr
	     * @return {!Array<{name:string, path:string, arrayPath:?string}>}
	     */
	    _createDataParameterInfos: function (paramsDescr) {
	        return paramsDescr.map(function (paramDescr) {
	            return {
	                name: paramDescr["name"],
	                path: paramDescr["path"],
	                arrayPath: paramDescr["array"] || null
	            };
	        });
	    },

	    /**
	     * @private
	     * @param {!Array<!Object>} paramsDescr
	     * @return {!Array<{name:string, header:string, value:string}>}
	     */
	    _createHeaderParameterInfos: function (paramsDescr) {
	        return paramsDescr.map(function (paramDescr) {
	            return {
	                name: paramDescr["name"],
	                header: paramDescr["header"],
	                value: paramDescr["value"]
	            };
	        });
	    },

	    /** @override */
	    executeOperation: function (context) {
	        var thisService = this;
	        return this._sendRequest(context.getInput()).then(function (response) {
	            var outputs = thisService._processResponse(response);
	            return new wrm.nav.Output("success", outputs);
	        })["catch"](function (e) {
	            return new wrm.nav.Output("error", {
	                "errorMessage": "Unexpected error"
	            });
	        });
	    },

	    /*
	     * Request
	     */

	    /**
	     * @param {!wrm.nav.Input} input
	     * @return {!Promise<!angular.$http.Response>}
	     */
	    _sendRequest: function (input) {
	        var platform = this.getManager().getPlatform();

	        /* Prepare the URL to invoke, also replacing parameters */
	        var currentUrl = this._url.replace(/\{(.+?)\}/g, function (m, placeholderName) {
	            return input["path." + placeholderName];
	        });

	        /* Prepare the data to send in the query and in the body */
	        var requestData = this._prepareRequestData(input);
	        var requestHeaders = this._prepareRequestHeaders(input);
	        var queryParams = this._preapreQueryParams(requestData, requestHeaders, input);
	        var bodyDataPromise = this._preapreBodyData(requestData, requestHeaders, input);

	        return bodyDataPromise.then((function (bodyData) {
	            return platform.makeHttpRequest({
	                method: this._method,
	                url: currentUrl,
	                headers: requestHeaders,
	                params: queryParams,
	                data: bodyData,
	                responseType: this._responseType,
	                timeout: this._timeout
	            });
	        }).bind(this));
	    },

	    /**
	     * @private
	     * @param {!Object} data
	     * @param {!Object<string,string>} headers
	     * @param {!wrm.nav.Input} input
	     * @return {!Object}
	     */
	    _preapreQueryParams: function (data, headers, input) {
	        if (!(this._method === "GET" || this._method === "DELETE")) {
	            return {}; // no query for other methods
	        }
	        return data;
	    },

	    /**
	     * @private
	     * @param {!Object} data
	     * @param {!Object<string,string>} headers
	     * @param {!wrm.nav.Input} input
	     * @return {!Promise<!Object>}
	     */
	    _preapreBodyData: function (data, headers, input) {
	        if (this._method === "GET" || this._method === "DELETE") {
	            return Promise.resolve({}); // no body for these methods
	        }

	        var attachedBlobs = wrm.data.toBlobArray(input["attachmentBlobs"]);
	        if (attachedBlobs.length <= 0) {
	            return Promise.resolve(this._prepareBodySimple(data, headers));
	        } else {
	            return this._prepareBodyWithAttachments(data, headers, attachedBlobs);
	        }
	    },

	    /**
	     * @private
	     * @param {!Object} data
	     * @param {!Object<string,string>} headers
	     * @return {!Object}
	     */
	    _prepareBodySimple: function (data, headers) {
	        switch (this._requestType) {
	            case RequestType.JSON:
	                return data;
	            case RequestType.FORM_DATA:
	                var fd = new FormData();
	                Object.keys(data).forEach(function (key) {
	                    fd.append(key, data[key]);
	                });
	                return fd;
	            default:
	                throw new Error("Unknown request type");
	        }
	    },

	    /**
	     * @private
	     * @param {!Object} data
	     * @param {!Object<string,?string|undefined>} headers
	     * @param {!Array<!wrm.data.Blob>} attachedBlobs
	     * @return {!Promise<!Object>}
	     */
	    _prepareBodyWithAttachments: function (data, headers, attachedBlobs) {
	        headers["Content-Type"] = undefined;

	        /** @type {!Array<!Promise<{id:string, blob:!Blob}>>} */
	        var attachmentPromises = attachedBlobs.map(function (blob) {
	            return blob.readBlob().then(function (nativeBlob) {
	                return {
	                    id: blob.getUniqueId(),
	                    blob: nativeBlob
	                };
	            });
	        });

	        return Promise.all(attachmentPromises).then((function (attachments) {
	            var fd = new FormData();

	            switch (this._requestType) {
	                case RequestType.JSON:
	                    fd.append("data", JSON.stringify(data));
	                    break;
	                case RequestType.FORM_DATA:
	                    Object.keys(data).forEach(function (key) {
	                        fd.append(key, data[key]);
	                    });
	                    break;
	                default:
	                    throw new Error("Unknown request type");
	            }

	            attachments.forEach(function (attachment) {
	                fd.append(attachment.id, attachment.blob);
	            });

	            return fd;
	        }).bind(this));
	    },

	    /**
	     * @private
	     * @param {!wrm.nav.Input} input
	     * @return {!Object}
	     */
	    _prepareRequestData: function (input) {
	        var om = new wrm.util.ObjectMapper();

	        /** @type {!Object<string,!Array<{elementPath:string, value:!Array<*>}>>} */
	        var arrayElementInfos = {};

	        /* Fill inputs that do not contribute to arrays; store away all others in order to build ARRAYS later */
	        this._requestInputs.forEach(function (info) {

	            /* Retrieve and convert the input value */
	            var value = input[info.name];
	            if (value === undefined) {
	                return; // continue to next input
	            }
	            value = this._formatInput(value);

	            /* Set value according to path; for empty paths, replace the entire object; skip and store array values */
	            var path = info.path;
	            var arrayPath = info.arrayPath;
	            if (arrayPath) {
	                var elementInfos = arrayElementInfos[arrayPath];
	                if (!elementInfos) {
	                    arrayElementInfos[arrayPath] = elementInfos = [];
	                }
	                elementInfos.push({
	                    elementPath: path.length > arrayPath.length ? path.substring(arrayPath.length + ".".length) : "",
	                    value: wrm.data.toAnyArray(value)
	                });
	            } else {
	                if (path === "") {
	                    om = new wrm.util.ObjectMapper(value);
	                } else {
	                    om.setValue(path, value);
	                }
	            }
	        }, this);

	        /* Build array inputs from their partial inputs */
	        Object.keys(arrayElementInfos).forEach(function (arrayPath) {
	            var arrayValue = this._buildArrayValue(arrayElementInfos[arrayPath], arrayPath);
	            om.setValue(arrayPath, arrayValue);
	        }, this);

	        return om.getObject();
	    },

	    /**
	     * @private
	     * @param {!Array<{elementPath:string, value:!Array<*>}>} elementInfos
	     * @param {string} arrayPath
	     * @return {!Array<*>}
	     */
	    _buildArrayValue: function (elementInfos, arrayPath) {
	        var result = [];

	        /* Normalize values, turning them into arrays of the same length */
	        var normalizedValues = {};
	        var maxLength = 1;
	        for (var i = 0; i < elementInfos.length; i++) {
	            var elementInfo = elementInfos[i];
	            var elementValue = elementInfo.value;
	            if (elementValue.length > 1) {
	                if (maxLength === 1) {
	                    maxLength = elementValue.length;
	                } else if (maxLength !== elementValue.length) {
	                    throw new Error("Input array lengths for '" + arrayPath + "' do not match");
	                }
	            }
	            normalizedValues[elementInfo.elementPath] = elementValue;
	        }

	        /* Condense elements at the same indexes into separate objects */
	        for (var i = 0; i < maxLength; i++) {
	            var om = new wrm.util.ObjectMapper();
	            Object.keys(normalizedValues).forEach(function (elementPath) {
	                var valueArray = normalizedValues[elementPath];
	                var valueElement = valueArray.length === 1 ? valueArray[0] : valueArray[i];
	                if (elementPath === "") {
	                    om = new wrm.util.ObjectMapper(valueElement);
	                } else {
	                    om.setValue(elementPath, valueElement);
	                }
	            });
	            result[i] = om.getObject();
	        }

	        return result;
	    },

	    /**
	     * @param {!wrm.nav.Input} input
	     * @return {!Object<string,string>}
	     */
	    _prepareRequestHeaders: function (input) {
	        var headers = {};

	        /* Include the HTTP authentication header */
	        this._addBasicAuthenticationHeader(headers, input);

	        /* Add other headers */
	        this._requestHeaderInputs.forEach(function (info) {

	            /* Retrieve and convert the input value */
	            var value = input[info.name];
	            if (value === undefined) {
	                value = info.value;
	            }
	            value = this._formatInput(value);

	            headers[info.header] = value;
	        }, this);

	        return headers;
	    },

	    /**
	     * @private
	     * @param {!Object<string,string>} headers
	     * @param {!wrm.nav.Input} input
	     */
	    _addBasicAuthenticationHeader: function (headers, input) {
	        var authentication = this._httpAuthentication;
	        if (!authentication) {
	            return; // authentication not used
	        }

	        var username = input["httpUsername"] || authentication.username;
	        var password = input["httpPassword"] || authentication.password;

	        var authorization = "Basic " + this._convertToBase64("" + username + ":" + password);
	        headers["Authorization"] = authorization;
	    },

	    /**
	     * @private
	     * @param {!Array<*>|*} valueOrArray
	     * @return {!Array<*>|*}
	     */
	    _formatInput: function (valueOrArray) {
	        // TODO implement a better type conversion with information from generation
	        if (Array.isArray(valueOrArray)) {
	            return valueOrArray.map(this._formatInputValue, this);
	        }
	        return this._formatInputValue(valueOrArray);
	    },

	    /**
	     * @private
	     * @param {*} value
	     * @return {*}
	     */
	    _formatInputValue: function (value) {

	        /* Handle native dates as timestamps */
	        if (value instanceof Date) {
	            value = wrm.data.DateTime.fromDate(value);
	        }

	        /* Convert to a JSON-compatible value */
	        var type = typeof value;
	        if (type !== "string" && type !== "number" && type !== "boolean") {
	            value = wrm.data.toString(value);
	        }
	        return value;
	    },

	    /**
	     * @private
	     * @param {!string} stringToConvert
	     * @return {!string}
	     */
	    _convertToBase64: function (stringToConvert) {
	        // TODO delete and use native base64 conversion!
	        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	        var output = "";
	        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	        var i = 0;
	        stringToConvert = this._utf8_encode(stringToConvert);
	        while (i < stringToConvert.length) {
	            chr1 = stringToConvert.charCodeAt(i++);
	            chr2 = stringToConvert.charCodeAt(i++);
	            chr3 = stringToConvert.charCodeAt(i++);
	            enc1 = chr1 >> 2;
	            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
	            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
	            enc4 = chr3 & 63;
	            if (isNaN(chr2)) {
	                enc3 = enc4 = 64;
	            } else if (isNaN(chr3)) {
	                enc4 = 64;
	            }
	            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
	        }
	        return output;
	    },

	    /**
	     * @private
	     * @param {!string} stringToConvert
	     * @return {!string}
	     */
	    _utf8_encode: function (stringToConvert) {
	        stringToConvert = stringToConvert.replace(/\r\n/g, "\n");
	        var utftext = "";
	        for (var n = 0; n < stringToConvert.length; n++) {
	            var c = stringToConvert.charCodeAt(n);
	            if (c < 128) {
	                utftext += String.fromCharCode(c);
	            } else if (c > 127 && c < 2048) {
	                utftext += String.fromCharCode(c >> 6 | 192);
	                utftext += String.fromCharCode(c & 63 | 128);
	            } else {
	                utftext += String.fromCharCode(c >> 12 | 224);
	                utftext += String.fromCharCode(c >> 6 & 63 | 128);
	                utftext += String.fromCharCode(c & 63 | 128);
	            }
	        }
	        return utftext;
	    },

	    /*
	     * Response
	     */

	    /**
	     * @private
	     * @param {!angular.$http.Response} response
	     * @return {!Object<string,*>}
	     */
	    _processResponse: function (response) {
	        var data = response.data;
	        var outputs = {};

	        /* Extract response data as outputs */
	        switch (this._responseType) {
	            case ResponseType.JSON:
	                this._extractResponseData(outputs, response.data);
	                outputs["json"] = JSON.stringify(response.data);
	                break;
	            case ResponseType.TEXT:
	                outputs["text"] = String(data);
	                break;
	        }

	        /* Extract response headers */
	        this._extractResponseHeaders(outputs, response);

	        return outputs;
	    },

	    /**
	     * @param {!Object<string,*>} outputs
	     * @param {!Object} responseData
	     */
	    _extractResponseData: function (outputs, responseData) {
	        var om = new wrm.util.ObjectMapper(responseData);
	        om.setFlattenArrays(true);
	        this._responseOutputs.forEach(function (info) {

	            /* Get value according to path; for empty value, retrieve the entire object */
	            var value;
	            if (info.path === "") {
	                if (info.arrayPath) {
	                    value = wrm.data.toAnyArray(om.getObject());
	                } else {
	                    value = wrm.data.toAnySingle(om.getObject());
	                }
	            } else {
	                if (info.arrayPath) {
	                    value = om.getValues(info.path);
	                } else {
	                    value = om.getValue(info.path);
	                }
	            }

	            if (value !== undefined) {
	                outputs[info.name] = value;
	            }
	        }, this);
	    },

	    /**
	     * @param {!Object<string,*>} outputs
	     * @param {!angular.$http.Response} response
	     */
	    _extractResponseHeaders: function (outputs, response) {
	        var headers = response.headers();
	        this._responseHeaderOutputs.forEach(function (info) {
	            outputs[info.name] = headers[info.header.toLowerCase()];
	        });
	    } });

	/**
	 * @private
	 * @enum {string}
	 */
	var RequestType = {
	    JSON: "JSON",
	    FORM_DATA: "FORM_DATA"
	};

	/**
	 * @private
	 * @enum {string}
	 */
	var ResponseType = { // values used in HTTP request config
	    JSON: "json",
	    TEXT: "text"
	};
	module.exports = exports.default;
	/** @type {!Object} */

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Delete operations.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractOperationService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractOperationService, {

	    /** @override */
	    initialize: function (descr) {
	        var thisService = this;

	        /**
	         * @private
	         * @type {!string}
	         */
	        this._entityId = descr["entity"];

	        // TODO cache query instead
	        /**
	         * @private
	         * @type {!Object}
	         */
	        this._condExpr; // init'd below

	        /**
	         * @private
	         * @type {!wrm.data.DataService}
	         */
	        this._dataService; // init'd below

	        return this.getManager().getDataService().then(function (dataService) {
	            thisService._dataService = dataService;
	            thisService._condExpr = descr["condExprs"];
	        });
	    },

	    /** @override */
	    executeOperation: function (context) {
	        var thisService = this;
	        var input = context.getInput();

	        var resultsPromise = this._dataService.execute(function (d) {

	            var options = {
	                filter: thisService._condExpr
	            };

	            return d["delete"](thisService._entityId, options, input);
	        });

	        return resultsPromise.then(function (numberDeletedObj) {
	            var code = numberDeletedObj === 0 ? "success.Not Found" : "success";
	            return new wrm.nav.Output(code);
	        }, function (e) {
	            thisService.getLog().error(e);
	            return new wrm.nav.Output("error");
	        });
	    } });
	module.exports = exports.default;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Login operations.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractOperationService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractOperationService, {

	    /** @override */
	    initialize: function (descr) {
	        var thisService = this;

	        /**
	         * @private
	         * @type {boolean}
	         */
	        this._onlySaveCredentials = descr["onlySaveCredentials"] || false;

	        /**
	         * @private
	         * @type {!wrm.core.SecurityService}
	         */
	        this._securityService; // set below

	        /**
	         * @private
	         * @type {!wrm.data.DataService}
	         */
	        this._dataService; // set below

	        return Promise.all([this.getManager().getSecurityService().then(function (securityService) {
	            thisService._securityService = securityService;
	        }), this.getManager().getDataService().then(function (dataService) {
	            thisService._dataService = dataService;
	        })]);
	    },

	    /** @override */
	    executeOperation: function (context) {
	        var thisService = this;
	        var securityService = this._securityService;
	        var input = context.getInput();

	        var username = wrm.data.toString(input["username"]);
	        var password = wrm.data.toString(input["password"]);
	        var token = wrm.data.toString(input["token"]);

	        if (typeof username !== "string" || typeof password !== "string") {
	            throw new Error("Missing username or password");
	        }

	        var oldAuthUsername;

	        /*
	         * Obtain authentication information by performing a "real" access or by just taking the inputs as correct. The behavior
	         * depends on the 'onlySaveCredentials' specified by the descriptor.
	         */
	        var promise = securityService.retrieveAuthUsername().then(function (oldUsername) {
	            oldAuthUsername = oldUsername;
	        }).then(function () {
	            if (thisService._onlySaveCredentials) {
	                return thisService._createAuthInfo(username, password, token);
	            }
	            return securityService.authenticate(username, password);
	        });

	        var currentAuthUsername;

	        /* If authentication is successful, store user information (effectively logging the user in) */
	        promise = promise.then(function (authInfo) {
	            currentAuthUsername = authInfo.userInfo.getUsername();
	            return securityService.setAuthInfo(authInfo);
	        }).then(function () {
	            if (!oldAuthUsername || oldAuthUsername !== currentAuthUsername) {
	                return thisService._dataService.restoreInitialData();
	            }
	        }).then(function () {
	            context.clearPastNavigationsHistory();
	            return new wrm.nav.Output("success");
	        });

	        /* In case of error, return an appropriate output code */
	        promise = promise["catch"](function (e) {
	            var result = e instanceof wrm.core.AuthenticationError ? "error" : "error.Internal Error";
	            return new wrm.nav.Output(result, {
	                "errorMessage": e.message
	            });
	        });

	        return promise;
	    },

	    /**
	     * @private
	     * @param {string} username
	     * @param {string} password
	     * @param {?string|undefined} token
	     * @return {{userInfo:!wrm.core.UserInfo, password:string, token:?string}}
	     */
	    _createAuthInfo: function (username, password, token) {
	        return {
	            userInfo: new wrm.core.UserInfo(username, null, {}, {}),
	            password: password,
	            token: token || null
	        };
	    }

	});
	module.exports = exports.default;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Logout operations.
	 * 
	 * @constructor
	 * @extends wrm.core.AbstractOperationService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.core.AbstractOperationService, {

	    /** @override */
	    initialize: function (descr) {
	        var thisService = this;

	        /**
	         * @private
	         * @type {boolean}
	         */
	        this._removeUsername = descr["removeUsername"] || false;

	        /**
	         * @private
	         * @type {!wrm.core.SecurityService}
	         */
	        this._securityService; // set below

	        return this.getManager().getSecurityService().then(function (securityService) {
	            thisService._securityService = securityService;
	        });
	    },

	    /** @override */
	    executeOperation: function (context) {
	        var securityService = this._securityService;

	        /* Clear authentication information */
	        return securityService.clearAuthInfo(this._removeUsername).then(function () {
	            context.clearPastNavigationsHistory();
	            return new wrm.nav.Output("success");
	        }, function () {
	            return new wrm.nav.Output("error");
	        });
	    } });
	module.exports = exports.default;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for EMail validation rules.
	 * 
	 * @constructor
	 * @extends wrm.val.AbstractPropertyValidationRuleService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.val.AbstractPropertyValidationRuleService, {

	    /** @override */
	    validate: function (context) {
	        var property = context.getElement();
	        var propertyValue = property.getValue();
	        if (propertyValue === undefined || propertyValue === null || propertyValue === "") {
	            return wrm.val.RulePolicy.CONTINUE;
	        }
	        /* regex copied from http://scraping.pro/email-validation-regexes and added capital letters */
	        var mailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
	        if (!mailRegex.exec(propertyValue)) {
	            property.addError(this.getMessageKey("error"));
	            return wrm.val.RulePolicy.STOP;
	        }
	        return wrm.val.RulePolicy.CONTINUE;
	    } });
	module.exports = exports.default;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Service for Mandatory validation rules.
	 * 
	 * @constructor
	 * @extends wrm.val.AbstractPropertyValidationRuleService
	 * @param {string} id
	 * @param {!Object} descr
	 * @param {!wrm.core.Manager} manager
	 */
	exports.default = wrm.defineService(wrm.val.AbstractPropertyValidationRuleService, {

	    /** @override */
	    initialize: function (descr) {

	        /**
	         * @private
	         * @type {string|undefined}
	         */
	        this._companionFieldId = descr["companionProperty"] || undefined;

	        /**
	         * @private
	         * @type {string|undefined}
	         */
	        this._predicate = this._companionFieldId && descr["predicate"];

	        /**
	         * @private
	         * @type {boolean|undefined}
	         */
	        this._ignoreCase = this._companionFieldId && (descr["ignoreCase"] || false);

	        /**
	         * @private
	         * @type {string|undefined}
	         */
	        this._value = this._companionFieldId && descr["value"];
	    },

	    /** @override */
	    validate: function (context) {
	        var property = context.getElement();
	        var propertyValue = property.getValue();
	        if (this._isEmpty(propertyValue) && this._isCompanionMatching(property)) {
	            property.addError(this.getMessageKey("error"));
	            return wrm.val.RulePolicy.STOP;
	        }
	        return wrm.val.RulePolicy.CONTINUE;
	    },

	    /**
	     * @private
	     * @param {!wrm.val.Property} property
	     * @return {boolean}
	     */
	    _isCompanionMatching: function (property) {
	        if (this._companionFieldId === undefined) {
	            return true; // no companion
	        }

	        var companionValue = property.getObject().getProperty(this._companionFieldId).getValue();
	        var ieEmptyCompanion = this._isEmpty(companionValue);
	        if (this._value === undefined) {

	            /* UNARY test on the companion value */
	            switch (this._predicate) {
	                case "empty":
	                    return ieEmptyCompanion;
	                case "notEmpty":
	                    return !ieEmptyCompanion;
	            }
	        } else {

	            /* Empty companions never pass a binary test */
	            if (ieEmptyCompanion) {
	                return false;
	            }

	            /* BINARY test against the (non empty) companion value */
	            var value = this._value;
	            var left = this._ignoreCase ? wrm.data.toString(companionValue).toLowerCase() : wrm.data.toString(companionValue);
	            var right = this._ignoreCase ? value.toLowerCase() : value;
	            switch (this._predicate) {
	                case "eq":
	                    return wrm.data.equal(left, right);
	                case "gteq":
	                    return wrm.data.compare(companionValue, value) >= 0;
	                case "gt":
	                    return wrm.data.compare(companionValue, value) > 0;
	                case "lteq":
	                    return wrm.data.compare(companionValue, value) <= 0;
	                case "lt":
	                    return wrm.data.compare(companionValue, value) < 0;
	                case "neq":
	                    return !wrm.data.equal(left, right);
	            }
	        }

	        /* DEFAULT behavior: the companion only has to be filled */
	        return !ieEmptyCompanion;
	    },

	    /**
	     * @private
	     * @param {*} value
	     * @return {boolean}
	     */
	    _isEmpty: function (value) {
	        return value === null || value === undefined || value === "";
	    } });
	module.exports = exports.default;

/***/ }
/******/ ]);