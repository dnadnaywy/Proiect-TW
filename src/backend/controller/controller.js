const { authenticationController } = require('./authenticationController');
const { userController } = require('./userController');
const url = require("url");
const pieChartController = require("./pieChartController");
const paginationController = require("./paginationController");
const searchController = require("./searchController");
const treemapController = require("./treemapController");
const worldmapController = require("./worldmapController");
const sendEmailModel = require("../utils/sendEmailNewsletter.js");
const sendEmail = require('../utils/sendEmailNewsletter.js');
const filteringModel = require('../model/filteringModel');

const handleApiRequest = async (req, res, pool) => {
    const URL = req.url;
    const parsedUrl = url.parse(req.url, true); // for the pagination stuff
    if (req.url === '/terrorism-data' && req.method === 'GET') {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM terrorism_data');
            const users = result.rows;
            client.release();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } catch (error) {
            console.error('Error executing query', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal server error');
        } finally {
            pool.end();
        }
    } else if (req.url === '/api/countAttackTypes' && req.method === 'GET') {
        pieChartController.getCountAttackTypes(req, res, pool);
    } else if (req.url === '/api/pie/country' && req.method === 'GET') {
        const country = 'country';
        pieChartController.getCountCountry(req, res, pool, country);
    } else if (req.url === '/api/pie/region' && req.method === 'GET') {
        const region = 'region';
        pieChartController.getCountCountry(req, res, pool, region);
    } else if (req.url === '/api/pie/target' && req.method === 'GET') {
        const target = 'target';
        pieChartController.getCountCountry(req, res, pool, target);
    } else if (req.url === '/api/pie/group_name' && req.method === 'GET') {
        const group_name = 'group_name';
        pieChartController.getCountCountry(req, res, pool, group_name);
    } else if (req.url === '/api/pie/weapon_type' && req.method === 'GET') {
        const weapon_type = 'weapon_type';
        pieChartController.getCountCountry(req, res, pool, weapon_type);
    } else if (req.url === '/api/pie/weapon_subtype' && req.method === 'GET') {
        const weapon_subtype = 'weapon_subtype';
        pieChartController.getCountCountry(req, res, pool, weapon_subtype);
    } else if (req.url === '/api/pie/nkill' && req.method === 'GET') {
        const nkill = 'nkill';
        pieChartController.getCountCountry(req, res, pool, nkill);
    } else if (req.url === '/api/pie/nkill_us' && req.method === 'GET') {
        const nkill_us = 'nkill_us';
        pieChartController.getCountCountry(req, res, pool, nkill_us);
    } else if (req.url === '/api/terrorist-cards' && req.method === 'GET') {
        pieChartController.getAllRow(req, res, pool);
    } else if (req.url.startsWith('/api/terrorist-card/') && req.method === 'GET') {
        const id = req.url.substring(20);
        pieChartController.getAllRowById(req, res, pool, id);
    } else if (req.url.startsWith('/api/terrorist-cards') && req.method === 'GET') {
        const queryParams = parsedUrl.query;
        var page = parseInt(queryParams.page) || 1;
        if (page > 18170) {
            page = 1; //any page over 18170 (the last calculated page will be assigned to the first page)
        }
        paginationController.get10RowsPagination(req, res, pool, page);
    } else if (req.url === '/api/countries' && req.method === 'GET') {
        searchController.getAllCountries(req, res, pool);
    } //-------------------------------------sending emails-----------------------------------
    else if (req.url === '/api/send-email' && req.method === 'POST') {
        let email = "";
        req.on("data", chunk => {
            email += chunk;
        });
        req.on("end", () => {
            sendEmail(email);
            res.statusCode = 200;
            res.end("Email sent successfully");
        });
    } //--------------------------------filters for search page ------------------------------
    else if (req.url === '/api/filtering' && req.method === 'POST') {
        filteringModel.getFiltering(req, res, pool);
    }
    // ----------------------------- PIE CHART ----------------------------------------------
    else if (req.url === '/api/countAttackTypes' && req.method === 'GET') {
        pieChartController.getCountAttackTypes(req, res, pool);
    } else if (req.url === '/api/pie/country' && req.method === 'GET') {
        const country = 'country';
        pieChartController.getCountCountry(req, res, pool, country);
    } else if (req.url === '/api/pie/region' && req.method === 'GET') {
        const region = 'region';
        pieChartController.getCountCountry(req, res, pool, region);
    } else if (req.url === '/api/pie/target' && req.method === 'GET') {
        const target = 'target';
        pieChartController.getCountCountry(req, res, pool, target);
    } else if (req.url === '/api/pie/group_name' && req.method === 'GET') {
        const group_name = 'group_name';
        pieChartController.getCountCountry(req, res, pool, group_name);
    } else if (req.url === '/api/pie/weapon_type' && req.method === 'GET') {
        const weapon_type = 'weapon_type';
        pieChartController.getCountCountry(req, res, pool, weapon_type);
    } else if (req.url === '/api/pie/weapon_subtype' && req.method === 'GET') {
        const weapon_subtype = 'weapon_subtype';
        pieChartController.getCountCountry(req, res, pool, weapon_subtype);
    } else if (req.url === '/api/pie/nkill' && req.method === 'GET') {
        const nkill = 'nkill';
        pieChartController.getCountCountry(req, res, pool, nkill);
    } else if (req.url === '/api/pie/nkill_us' && req.method === 'GET') {
        const nkill_us = 'nkill_us';
        pieChartController.getCountCountry(req, res, pool, nkill_us);
    }
    // ----------------------------- SEARCH PAGE --------------------------------------------
    else if (req.url === '/api/terrorist-cards' && req.method === 'GET') {
        pieChartController.getAllRow(req, res, pool);
    } else if (req.url.startsWith('/api/terrorist-card/') && req.method === 'GET') {
        const id = req.url.substring(20);
        pieChartController.getAllRowById(req, res, pool, id);
    }
    // ------------------------------ TREEMAP -----------------------------------------------
    else if (req.url === '/api/treemap/country' && req.method === 'GET') {
        const country = 'country';
        treemapController.getCountByColumn(req, res, pool, country);
    } else if (req.url === '/api/treemap/region' && req.method === 'GET') {
        const region = 'region';
        treemapController.getCountByColumn(req, res, pool, region);
    } else if (req.url === '/api/treemap/attack_type' && req.method === 'GET') {
        const attack_type = 'attack_type';
        treemapController.getCountByColumn(req, res, pool, attack_type);
    } else if (req.url === '/api/treemap/target' && req.method === 'GET') {
        const target = 'target';
        treemapController.getCountByColumn(req, res, pool, target);
    } else if (req.url === '/api/treemap/group_name' && req.method === 'GET') {
        const group = 'group_name';
        treemapController.getCountByColumn(req, res, pool, group);
    } else if (req.url === '/api/treemap/weapon_type' && req.method === 'GET') {
        const weapon = 'weapon_type';
        treemapController.getCountByColumn(req, res, pool, weapon);
    } else if (req.url === '/api/treemap/weapon_subtype' && req.method === 'GET') {
        const weapon_subtype = 'weapon_subtype';
        treemapController.getCountByColumn(req, res, pool, weapon_subtype);
    } else if (req.url === '/api/treemap/nkill' && req.method === 'GET') {
        const deaths = 'nkill';
        treemapController.getCountByColumn(req, res, pool, deaths);
    } else if (req.url === '/api/treemap/nkill_us' && req.method === 'GET') {
        const deaths_us = 'nkill_us';
        treemapController.getCountByColumn(req, res, pool, deaths_us);
    }
    // ----------------------------- WORLD MAP ----------------------------------------------
    else if (req.url === '/api/worldmap' && req.method === 'GET') {
        worldmapController.getCount(req, res, pool);
    } else if (URL.startsWith('/api/authentication')) {
        await authenticationController(req, res, pool);
    } else if (URL.startsWith('/api/users')) {
        await userController(req, res, pool);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        // return;
    }
}


module.exports = handleApiRequest;