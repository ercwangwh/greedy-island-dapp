// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Skills {
    // string public constant index = "Skills";
    // mapping(bytes32 => bytes32[]) public traits;

    function skill_by_id(uint _id)
        external
        pure
        returns (
            uint id,
            string memory name,
            string memory trait_type,
            string memory trait_value,
            uint multiple
        )
    {
        if (_id == 0) {
            return fireblast();
        } else if (_id == 1) {
            return fireball();
        } else if (_id == 2) {
            return pyroblast();
        }
    }

    function fireblast()
        public
        pure
        returns (
            uint id,
            string memory name,
            string memory trait_type,
            string memory trait_value,
            uint multiple
        )
    {
        id = 0;
        name = "Fire Blast";
        trait_type = "Accessories";
        trait_value = "Bat";
        multiple = 2;
    }

    function fireball()
        public
        pure
        returns (
            uint id,
            string memory name,
            string memory trait_type,
            string memory trait_value,
            uint multiple
        )
    {
        id = 1;
        name = "Fire Ball";
        trait_type = "Accessories";
        trait_value = "Gold Chain";
        multiple = 5;
    }

    function pyroblast()
        public
        pure
        returns (
            uint id,
            string memory name,
            string memory trait_type,
            string memory trait_value,
            uint multiple
        )
    {
        id = 2;
        name = "Pyroblast";
        trait_type = "Accessories";
        trait_value = "Gold Rolex";
        multiple = 10;
    }
}
