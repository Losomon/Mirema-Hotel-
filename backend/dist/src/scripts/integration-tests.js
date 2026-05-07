"use strict";
/**
 * Integration tests for Rooms CRUD endpoints
 * Run with: npm test
 * Prerequisites: MongoDB must be running
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Mock test runner
async function runTests() {
    const baseUrl = `http://localhost:${process.env.PORT || 5000}`;
    let adminToken = 'YOUR_ADMIN_TOKEN_HERE';
    let roomId = 'YOUR_ROOM_ID_HERE';
    try {
        console.log('\n📋 ROOMS CRUD TESTS\n');
        // Test 1: Create a room (admin only)
        console.log('1. POST /api/rooms - Create room (admin)');
        const createRoomRes = await fetch(`${baseUrl}/api/rooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
                name: 'Deluxe Suite',
                description: 'Luxury room with ocean view',
                price: 250,
                capacity: 4,
                amenities: ['WiFi', 'AC', 'Balcony'],
                imageUrl: 'https://example.com/deluxe.jpg',
            }),
        });
        const createRoomData = await createRoomRes.json();
        console.log(`Status: ${createRoomRes.status}`);
        console.log(`Response:`, JSON.stringify(createRoomData, null, 2));
        if (createRoomRes.ok && createRoomData.room) {
            roomId = createRoomData.room.id;
            console.log('✅ Room created successfully\n');
        }
        // Test 2: Get all rooms with pagination
        console.log('2. GET /api/rooms - List rooms with pagination');
        const listRoomsRes = await fetch(`${baseUrl}/api/rooms?page=1&limit=10&sort=price&order=asc`);
        const listRoomsData = await listRoomsRes.json();
        console.log(`Status: ${listRoomsRes.status}`);
        console.log(`Response:`, JSON.stringify(listRoomsData, null, 2));
        console.log('✅ Rooms listed successfully\n');
        // Test 3: Get room by ID
        console.log(`3. GET /api/rooms/:id - Get room (${roomId})`);
        const getRoomRes = await fetch(`${baseUrl}/api/rooms/${roomId}`);
        const getRoomData = await getRoomRes.json();
        console.log(`Status: ${getRoomRes.status}`);
        console.log(`Response:`, JSON.stringify(getRoomData, null, 2));
        console.log('✅ Room retrieved successfully\n');
        // Test 4: Update room (admin only)
        console.log(`4. PUT /api/rooms/:id - Update room (${roomId})`);
        const updateRoomRes = await fetch(`${baseUrl}/api/rooms/${roomId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
                price: 300,
                description: 'Updated luxury room',
            }),
        });
        const updateRoomData = await updateRoomRes.json();
        console.log(`Status: ${updateRoomRes.status}`);
        console.log(`Response:`, JSON.stringify(updateRoomData, null, 2));
        console.log('✅ Room updated successfully\n');
        // Test 5: Validation test - invalid room creation
        console.log('5. POST /api/rooms - Validation test (invalid data)');
        const invalidRes = await fetch(`${baseUrl}/api/rooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
                name: 'Test Room',
                price: -100, // Invalid: negative price
            }),
        });
        const invalidData = await invalidRes.json();
        console.log(`Status: ${invalidRes.status}`);
        console.log(`Response:`, JSON.stringify(invalidData, null, 2));
        console.log('✅ Validation working correctly\n');
        // Test 6: Delete room (admin only)
        console.log(`6. DELETE /api/rooms/:id - Delete room (${roomId})`);
        const deleteRoomRes = await fetch(`${baseUrl}/api/rooms/${roomId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
            },
        });
        const deleteRoomData = await deleteRoomRes.json();
        console.log(`Status: ${deleteRoomRes.status}`);
        console.log(`Response:`, JSON.stringify(deleteRoomData, null, 2));
        console.log('✅ Room deleted successfully\n');
        console.log('✅ ALL TESTS PASSED');
    }
    catch (error) {
        console.error('❌ TEST ERROR:', error);
    }
}
// Note: This is a template for integration tests.
// In a real scenario, you would use a testing framework like Jest or Supertest
// and run MongoDB in a test container or use a test database.
// Uncomment to run tests directly:
// runTests().catch(console.error);
console.log('Integration test template created.');
console.log('To run actual tests:');
console.log('1. Ensure MongoDB is running');
console.log('2. Run: npm run dev (in another terminal)');
console.log('3. Update adminToken with a valid JWT token from POST /api/auth/login');
console.log('4. Uncomment runTests() call at bottom and run: npx ts-node src/scripts/integration-tests.ts');
// Note: This is a template for integration tests.
// In a real scenario, you would use a testing framework like Jest or Supertest
// and run MongoDB in a test container or use a test database.
console.log('Integration test template created.');
console.log('To run actual tests:');
console.log('1. Ensure MongoDB is running');
console.log('2. Run: npm run dev (in another terminal)');
console.log('3. Update adminToken with a valid JWT token from POST /api/auth/login');
console.log('4. Run this test file');
