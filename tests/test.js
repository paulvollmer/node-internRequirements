"use strict";
var expect = require( "chai" ).expect;
process.env.NODE_ENV = "test";
process.env.REL_DEP_LOC = "deps";

var fnIntern;

describe( "InternRequirements", function()
{

  it( "should not throw an error if dependencies.json exists", function()
  {
    expect(function()
    {
      fnIntern = require( "../src/internRequirements.js" );
    } ).not.to.throw( /dependencies.json not found!$/ );

  } );
  it( "should load intern requirements", function()
  {
    expect( fnIntern( "mod" ) ).to.equal( require( "./modules/mod.js" ) );
  } );
  it( "should throw an error if the required module is unknown", function()
  {
    expect(function()
    {
      fnIntern( "foobar" );
    } ).to.throw( "module \"foobar\" not found" );
  } );

  it( "should load the correct intern requirement for the current environment", function()
  {
    expect( fnIntern( "foo" ) ).to.equal( require( "./modules/foo-dev.js" ) );
  } );

  it( "should load a npm module", function()
  {
    expect( fnIntern( "mocha" ) ).to.equal( require( "mocha" ) );
  } );

  it( "should load a file from a npm module", function()
  {
    expect( fnIntern( "mochaRunner" ) ).to.equal( require( "mocha/lib/runner" ) );
  } );
} );