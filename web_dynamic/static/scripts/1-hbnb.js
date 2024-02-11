<div class="amenities">
    <h3>Amenities</h3>
    <h4>&nbsp;</h4>
    <div class="popover">
        <ul>
            {% for amenity in amenities %}
            <li>
                <input type="checkbox" data-id="{{ amenity.id }}" data-name="{{ amenity.name }}"> {{ amenity.name }}
            </li>
            {% endfor %}
        </ul>
    </div>
</div>
