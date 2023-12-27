const MD5 = require("md5.js");

module.exports = (sequelize, Sequelize) => {
    const Agent = sequelize.define(
        "Agent",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            agentCode: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
                comment: "agent code",
            },
            agentName: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
                comment: "agent name",
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: "password",
            },
            apiType: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
                comment: "0: seamless, 1: transfer",
            },
            agentType: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
                comment: "1:point, 2:site, 3:both",
            },
            rtp: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 80,
            },
            balance: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
                comment: "balance",
            },
            percent: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 100,
                comment: "revenue share",
            },
            memo: {
                type: Sequelize.STRING,
                defaultValue: "",
                comment: "memo for agent",
            },
            adminMemo: {
                type: Sequelize.STRING,
                defaultValue: "",
                comment: "memo for admin",
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
                comment: "token",
            },
            secretKey: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
                comment: "seamless secretKey",
            },
            siteEndPoint: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
                comment: "seamless site endpoint",
            },
            totalCredit: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
                comment: "agent total win",
            },
            totalDebit: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0,
                comment: "agent total bet",
            },
            parentId: {
                type: Sequelize.INTEGER,
                comment: "parent agent id",
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
                comment: "1: running, 0: stopped, 2: removed",
            },
            depth: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: "agent depth",
            },
            role: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: "role",
            },
            ipAddress: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
            },
            parentPath: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: ".",
                comment: "parent path",
            },
            zeroSetting: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
                comment: "type: m/n, set m Zero spin in n bets",
            },
            zeroArray: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: "",
                comment: "index array for zero betting",
            },
            curIndex: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: "current betting index",
            },
            jackpotCome: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 100,
            },
            showCall: {
                type: Sequelize.TINYINT,
                allowNull: false,
                defaultValue: 1,
                comment: "whether to show call page to admin",
            },
            lang: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "en",
                comment: "site language",
            },
            currency: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "USD",
                comment: "agent currency",
            },
            curShow: {
                type: Sequelize.TINYINT,
                allowNull: false,
                defaultValue: 1,
                comment: "whether to show currency to user",
            },
            betEdited: {
                type: Sequelize.TINYINT,
                allowNull: false,
                defaultValue: 0,
                comment: "whether to customize bet info",
            },
            minBet: {
                type: Sequelize.DOUBLE(20, 2),
                allowNull: false,
                defaultValue: 0.2,
                comment: "customized min bet",
            },
            maxBet: {
                type: Sequelize.DOUBLE(20, 2),
                allowNull: false,
                defaultValue: 100,
                comment: "customized max bet",
            },
            betLimitSkin: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "SKIN1",
            },
            blockOppositeBet:{
                type: Sequelize.TINYINT,
                allowNull: false,
                defaultValue: 0
            },
            blockRedEnvelope:{
                type: Sequelize.TINYINT,
                allowNull: false,
                defaultValue: 0
            },
        },
        {
            tableName: "agents",
            timestamps: true,
        }
    );

    Agent.associate = (db) => {
        Agent.belongsTo(db.Agent, { foreignKey: "parentId", sourceKey: "id", as: "parent" });
    };

    Agent.migrate = async () => {
        const count = await Agent.count();

        if (count == 0) {
            await Agent.destroy({ truncate: true });

            await Agent.create({
                agentCode: "admin",
                agentName: "Admin",
                password: "123456",
                agentType: 3,
                memo: "Admin",
                role: 1,
                token: new MD5().update("admin" + "123456" + new Date()).digest("hex"),
                secretKey: new MD5().update("admin" + "123456" + "secret-key" + new Date()).digest("hex"),
            });
        }
    };

    return Agent;
};
